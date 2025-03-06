import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// Function to run Python script
async function runPythonScript(imagePath, metadata = null) {
  return new Promise((resolve, reject) => {
    // Path to model
    const modelPath = path.join(process.cwd(), 'public', 'models', 'model.pth');
    
    // Path to Python script
    const scriptPath = path.join(process.cwd(), 'lib', 'python', 'predict.py');
    
    // Create predict.py if it doesn't exist
    if (!fs.existsSync(scriptPath)) {
      const pythonScript = `
import sys
import torch
import json
from model_utils import get_model_instance

def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Invalid arguments. Usage: predict.py <model_path> <image_path> [metadata_json]"}), file=sys.stderr)
        return
    
    model_path = sys.argv[1]
    image_path = sys.argv[2]
    
    # Parse metadata if provided
    metadata = None
    if len(sys.argv) > 3:
        try:
            metadata = json.loads(sys.argv[3])
        except json.JSONDecodeError:
            print(json.dumps({"error": "Invalid metadata JSON format"}), file=sys.stderr)
            return
    
    try:
        # Load image
        with open(image_path, 'rb') as f:
            image_bytes = f.read()
        
        # Get model instance
        print("Loading model...", file=sys.stderr)
        model = get_model_instance(model_path)
        print("Model loaded successfully", file=sys.stderr)
        
        # Check if model supports metadata
        metadata_supported = hasattr(model, 'uses_metadata') and model.uses_metadata
        print(f"Model metadata support: {metadata_supported}", file=sys.stderr)
        
        # Make prediction
        print("Making prediction...", file=sys.stderr)
        result = model.predict(image_bytes, metadata)
        print("Prediction completed", file=sys.stderr)
        
        # Add metadata support info to result
        if isinstance(result, dict) and not 'error' in result:
            result['metadata_supported'] = metadata_supported
        
        # Return result as JSON
        print(json.dumps(result))
    except Exception as e:
        print(f"Error during prediction: {e}", file=sys.stderr)
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
`;
      fs.writeFileSync(scriptPath, pythonScript);
    }
    
    // Prepare command arguments
    const args = [scriptPath, modelPath, imagePath];
    
    // Add metadata as JSON string if provided
    if (metadata) {
      args.push(JSON.stringify(metadata));
    }
    
    // Run Python script
    const pythonProcess = spawn('python', args);
    
    let result = '';
    let error = '';
    
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
      console.error(`Python stderr: ${data}`);
    });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${error}`));
      } else {
        try {
          // Cari JSON yang valid dalam output
          const jsonMatch = result.match(/\{.*\}/s);
          if (jsonMatch) {
            const jsonResult = JSON.parse(jsonMatch[0]);
            resolve(jsonResult);
          } else {
            reject(new Error(`Failed to find valid JSON in Python output: ${result}`));
          }
        } catch {
          reject(new Error(`Failed to parse Python output: ${result}`));
        }
      }
    });
  });
}

export async function POST(request) {
  try {
    // Check if model exists
    const modelPath = path.join(process.cwd(), 'public', 'models', 'model.pth');
    if (!fs.existsSync(modelPath)) {
      return NextResponse.json(
        { error: 'Model file not found. Please place your model.pth file in the public/models directory.' },
        { status: 404 }
      );
    }
    
    // Get form data
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }
    
    // Extract metadata from form
    const metadata = {
      sex: formData.get('sex') || null,
      age_approx: formData.get('age_approx') || null,
      anatom_site_general: formData.get('anatom_site_general') || null
    };
    
    // Check if any metadata was provided
    const hasMetadata = Object.values(metadata).some(value => value !== null);
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save file temporarily
    const tempDir = join(process.cwd(), 'public', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const tempFilePath = join(tempDir, `temp_${Date.now()}.jpg`);
    await writeFile(tempFilePath, buffer);
    
    // Run prediction
    const result = await runPythonScript(tempFilePath, hasMetadata ? metadata : null);
    
    // Clean up temp file
    fs.unlinkSync(tempFilePath);
    
    // Ensure all_probabilities exists in the result
    if (!result.all_probabilities && result.probabilities) {
      // Fallback if all_probabilities is not provided by the model
      result.all_probabilities = {
        melanoma: result.probabilities.melanoma || 0,
        non_melanoma: result.probabilities.non_melanoma || 0
      };
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 