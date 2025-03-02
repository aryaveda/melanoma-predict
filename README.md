# Melanoma Predict

An AI-powered skin cancer detection tool that helps identify potential skin conditions with advanced image analysis technology.

## Features

- **Skin Lesion Analysis**: Upload images of skin lesions for AI-powered analysis
- **Interactive Results**: View detailed probability charts for various skin conditions
- **Comprehensive Information**: Get detailed information about detected conditions, including risk levels and recommended actions
- **Optional Metadata**: Include patient metadata for more accurate predictions (when supported by the model)

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS, Chart.js
- **Backend**: Python, FastAPI
- **AI Model**: PyTorch, EfficientNet-B3
- **Data Visualization**: Chart.js

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/melanoma-predict.git
   cd melanoma-predict
   ```

2. Install frontend dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Navigate to the Detection Tool page
2. Upload a clear image of the skin lesion
3. Optionally include patient metadata for more accurate results
4. Click "Analyze Image" to get predictions
5. Review the results and detailed information about detected conditions

## Disclaimer

This tool is intended for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

The predictions made by this tool are based on machine learning algorithms and may not always be accurate. Early detection of skin cancer is crucial, so if you notice any suspicious changes in your skin, please consult a dermatologist immediately.

## License

[MIT](LICENSE)
