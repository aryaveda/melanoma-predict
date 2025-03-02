'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Information about skin cancer types
const skinCancerInfo = {
  "melanoma": {
    name: "Melanoma",
    description: "The most dangerous type of skin cancer that develops from melanin-producing cells. Melanoma can spread to other parts of the body if not treated early.",
    riskLevel: "High",
    symptoms: "Moles that change in shape, size, or color; lesions with irregular shapes; color changes from brown to black.",
    advice: "Consult a dermatologist immediately for diagnosis and treatment. Early detection is crucial for successful treatment."
  },
  "BCC": {
    name: "Basal Cell Carcinoma (BCC)",
    description: "The most common type of skin cancer that rarely spreads to other parts of the body but can damage surrounding tissue if left untreated.",
    riskLevel: "Medium",
    symptoms: "Pink bumps, shiny lesions, or sores that don't heal.",
    advice: "Consult a dermatologist for diagnosis and treatment. BCC can usually be treated with simple surgery."
  },
  "SCC": {
    name: "Squamous Cell Carcinoma (SCC)",
    description: "The second most common type of skin cancer that can spread to other parts of the body if left untreated.",
    riskLevel: "Medium-High",
    symptoms: "Scaly bumps, red lesions, or sores that don't heal.",
    advice: "Consult a dermatologist for diagnosis and treatment. SCC requires prompt medical attention."
  },
  "BKL": {
    name: "Benign Keratosis-like Lesions (BKL)",
    description: "Benign skin growths that appear with age, including seborrheic keratosis.",
    riskLevel: "Low (Benign)",
    symptoms: "Brown or black growths with an oily or scaly surface.",
    advice: "Generally doesn't require treatment, but consult a dermatologist if there are changes or concerns."
  },
  "DF": {
    name: "Dermatofibroma (DF)",
    description: "Common benign skin growth, usually appearing after minor skin trauma.",
    riskLevel: "Low (Benign)",
    symptoms: "Small, hard, brown or pink bumps.",
    advice: "Generally doesn't require treatment, but can be removed if bothersome."
  },
  "VASC": {
    name: "Vascular Lesions (VASC)",
    description: "Blood vessel abnormalities in the skin, including hemangiomas and vascular malformations.",
    riskLevel: "Low (Benign)",
    symptoms: "Red or purple patches on the skin, sometimes raised.",
    advice: "Most vascular lesions are benign, but consult a dermatologist for evaluation."
  },
  "nevus": {
    name: "Nevus (Mole)",
    description: "Benign skin growth consisting of clustered melanin-producing cells.",
    riskLevel: "Low (Benign)",
    symptoms: "Brown or black patches with regular shapes.",
    advice: "Monitor for changes in shape, size, or color. Consult a dermatologist if changes occur."
  },
  "AK": {
    name: "Actinic Keratosis (AK)",
    description: "Pre-cancerous lesions caused by excessive sun exposure.",
    riskLevel: "Medium (Pre-cancerous)",
    symptoms: "Rough, scaly, red or brown patches.",
    advice: "Consult a dermatologist for treatment, as AK can develop into SCC."
  },
  "unknown": {
    name: "Unidentified",
    description: "Skin lesions that cannot be clearly categorized into other categories.",
    riskLevel: "Undetermined",
    symptoms: "Varies",
    advice: "Consult a dermatologist for further evaluation."
  }
};

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const [metadataSupported, setMetadataSupported] = useState(true); // Initial assumption that metadata is supported
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [metadata, setMetadata] = useState({
    sex: '',
    age_approx: '',
    anatom_site_general: ''
  });
  const fileInputRef = useRef(null);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPrediction(null);
    setError(null);
    setSelectedCondition(null);
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      setError('Please select an image file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      // Add metadata if provided and supported
      if (showMetadata && metadataSupported) {
        if (metadata.sex) formData.append('sex', metadata.sex);
        if (metadata.age_approx) formData.append('age_approx', metadata.age_approx);
        if (metadata.anatom_site_general) formData.append('anatom_site_general', metadata.anatom_site_general);
      }

      const response = await axios.post('/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if metadata is supported by the model
      if (response.data.metadata_supported === false) {
        setMetadataSupported(false);
      }

      setPrediction(response.data);
      
      // Find the condition with the highest probability
      if (response.data.all_probabilities) {
        const sortedConditions = Object.entries(response.data.all_probabilities)
          .sort((a, b) => b[1] - a[1]);
        
        if (sortedConditions.length > 0) {
          setSelectedCondition(sortedConditions[0][0]);
        }
      }
    } catch (err) {
      console.error('Error during prediction:', err);
      setError(err.response?.data?.error || 'An error occurred during prediction');
      
      // Check if error is related to metadata
      if (err.response?.data?.error && err.response.data.error.includes('metadata')) {
        setMetadataSupported(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setPrediction(null);
    setError(null);
    setSelectedCondition(null);
    setMetadata({
      sex: '',
      age_approx: '',
      anatom_site_general: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Clear the chart if it exists
    if (chartInstance) {
      chartInstance.destroy();
      setChartInstance(null);
    }
  };

  // Function to get color based on skin condition type
  const getConditionColor = (condition) => {
    const colors = {
      'melanoma': 'rgb(220, 38, 38)', // red-600
      'BCC': 'rgb(217, 119, 6)', // amber-600
      'SCC': 'rgb(234, 88, 12)', // orange-600
      'AK': 'rgb(234, 179, 8)', // yellow-500
      'default': 'rgb(59, 130, 246)' // blue-500
    };
    
    return colors[condition] || colors.default;
  };

  // Function to get text color class based on skin condition type
  const getConditionTextColorClass = (condition) => {
    const colorClasses = {
      'melanoma': 'text-red-600',
      'BCC': 'text-amber-600',
      'SCC': 'text-orange-600',
      'AK': 'text-yellow-600',
      'default': 'text-blue-600'
    };
    
    return colorClasses[condition] || colorClasses.default;
  };

  // Create chart when prediction data is available
  useEffect(() => {
    if (!prediction || !prediction.all_probabilities || !chartRef.current) return;
    
    // Import Chart.js dynamically
    import('chart.js/auto').then((ChartModule) => {
      const Chart = ChartModule.default;
      
      // Destroy previous chart if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }
      
      // Sort probabilities in descending order
      const sortedProbabilities = Object.entries(prediction.all_probabilities)
        .sort((a, b) => b[1] - a[1]);
      
      const labels = sortedProbabilities.map(([className]) => 
        skinCancerInfo[className]?.name || className.charAt(0).toUpperCase() + className.slice(1)
      );
      
      const data = sortedProbabilities.map(([, prob]) => prob * 100);
      
      const backgroundColors = sortedProbabilities.map(([className]) => getConditionColor(className));
      
      const newChart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Probability (%)',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('rgb', 'rgba').replace(')', ', 1)')),
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Probability (%)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Skin Condition'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Probability: ${context.raw.toFixed(2)}%`;
                }
              }
            }
          },
          onClick: (_, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              const className = sortedProbabilities[index][0];
              setSelectedCondition(className);
            }
          }
        }
      });
      
      setChartInstance(newChart);
    });
    
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [prediction]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Skin Cancer Detection</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload Skin Lesion Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            ref={fileInputRef}
          />
        </div>
        
        {metadataSupported ? (
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showMetadata"
                checked={showMetadata}
                onChange={() => setShowMetadata(!showMetadata)}
                className="mr-2"
              />
              <label htmlFor="showMetadata" className="text-gray-700 cursor-pointer">
                Include Patient Metadata (Improves Accuracy)
              </label>
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm">
            <p>
              <strong>Note:</strong> The current model does not support metadata. 
              Only image analysis will be performed.
            </p>
          </div>
        )}
        
        {showMetadata && metadataSupported && (
          <div className="mb-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-md font-semibold mb-3">Patient Metadata</h3>
            
            <div className="mb-3">
              <label className="block text-gray-700 mb-1 text-sm">Gender</label>
              <select
                name="sex"
                value={metadata.sex}
                onChange={handleMetadataChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Not specified</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label className="block text-gray-700 mb-1 text-sm">Age</label>
              <input
                type="number"
                name="age_approx"
                value={metadata.age_approx}
                onChange={handleMetadataChange}
                placeholder="Age in years"
                min="0"
                max="120"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            <div className="mb-1">
              <label className="block text-gray-700 mb-1 text-sm">Anatomical Location</label>
              <select
                name="anatom_site_general"
                value={metadata.anatom_site_general}
                onChange={handleMetadataChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Not specified</option>
                <option value="head/neck">Head/Neck</option>
                <option value="torso">Torso</option>
                <option value="upper extremity">Upper Extremity (Arms)</option>
                <option value="lower extremity">Lower Extremity (Legs)</option>
                <option value="palms/soles">Palms/Soles</option>
                <option value="oral/genital">Oral/Genital</option>
              </select>
            </div>
          </div>
        )}
        
        {previewUrl && (
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Preview:</p>
            <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading || !selectedImage}
            className={`flex-1 py-2 px-4 rounded-md ${
              loading || !selectedImage
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-medium`}
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
          
          <button
            type="button"
            onClick={resetForm}
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium"
          >
            Reset
          </button>
        </div>
      </form>
      
      {prediction && !loading && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-xl font-semibold mb-2">Analysis Results</h3>
          
          {prediction.metadata_used && (
            <div className="mb-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
              <span className="font-medium">✓ Metadata included in analysis</span>
            </div>
          )}
          
          <div className="mb-4">
            <span className="font-medium">Primary Prediction:</span>{' '}
            <span
              className={`font-bold ${
                prediction.prediction === 'Melanoma' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {prediction.prediction}
            </span>
            <span className="ml-2 font-medium">
              (Confidence: {(prediction.confidence * 100).toFixed(2)}%)
            </span>
          </div>
          
          {prediction.all_probabilities && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">All Condition Probabilities</h4>
              
              {/* Chart.js Bar Chart */}
              <div className="mb-6 bg-white p-2 rounded-md shadow-sm">
                <div className="h-80">
                  <canvas ref={chartRef}></canvas>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Click on a bar to see detailed information about the condition
                </p>
              </div>
              
              {/* Detailed Information for Selected Condition */}
              {selectedCondition && skinCancerInfo[selectedCondition] && (
                <div className={`mt-4 p-4 rounded-md border-l-4 ${selectedCondition === 'melanoma' ? 'border-red-500' : 'border-blue-500'} bg-white shadow-sm`}>
                  <h4 className={`text-lg font-bold mb-2 ${getConditionTextColorClass(selectedCondition)}`}>
                    {skinCancerInfo[selectedCondition].name}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-700 mb-3">
                        {skinCancerInfo[selectedCondition].description}
                      </p>
                      
                      <div className="mb-2">
                        <span className="text-sm font-semibold">Risk Level:</span>{' '}
                        <span className={`text-sm font-medium ${
                          skinCancerInfo[selectedCondition].riskLevel.includes('High') 
                            ? 'text-red-600' 
                            : skinCancerInfo[selectedCondition].riskLevel.includes('Medium')
                              ? 'text-orange-600'
                              : 'text-green-600'
                        }`}>
                          {skinCancerInfo[selectedCondition].riskLevel}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-semibold">Common Symptoms:</span>
                        <p className="text-sm text-gray-700">
                          {skinCancerInfo[selectedCondition].symptoms}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold">Advice:</span>
                        <p className="text-sm text-gray-700">
                          {skinCancerInfo[selectedCondition].advice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-500 p-3 bg-gray-100 rounded-md">
            <p className="font-bold mb-1">Important Note:</p>
            <p className="mb-2">
              These results are AI predictions only and should not replace professional medical diagnosis.
              Consult a dermatologist for proper diagnosis.
            </p>
            <p>
              Factors such as image quality, lighting, and angle can affect prediction accuracy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}