# Meow or Woof? ₍^. .^₎⟆ 

A cute and modern AI-powered pet classifier that instantly tells you whether your adorable furry friend is a cat or dog with incredible accuracy!

![Pink Theme](https://img.shields.io/badge/Theme-Pink%20%26%20Cute-ff69b4)
![AI Powered](https://img.shields.io/badge/AI-TensorFlow.js-orange)
![React](https://img.shields.io/badge/React-18+-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6)

## 🚀 Live Demo

Try the app now: **[Meow or Woof Classifier](https://meow-or-woof-classifier.vercel.app/)**

## Features

- 🤖 **AI-Powered Classification** - Uses TensorFlow.js for real-time pet recognition
- 🎨 **Beautiful Pink Theme** - Modern, cute design with Apple-inspired typography
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🖼️ **Drag & Drop Upload** - Easy image uploading with drag and drop support
- ⚡ **Real-time Analysis** - Instant predictions with confidence scores
- 🌸 **Customizable Colors** - Easy-to-modify CSS variables for theming
- 🎭 **Cute Kaomoji** - Adorable text-based emoticons throughout the interface

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd catvsdog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

## Customization

### Changing Colors

The app uses CSS custom properties for easy theming. Edit the variables in `src/App.css`:

```css
:root {
  /* Pink Color Palette */
  --bg-light: #fdf2f8;           /* Light pink background */
  --primary-pink: #df6789;       /* Main pink for buttons/icons */
  --primary-dark: #CE5F7E;       /* Darker pink for hover states */
  --text-main: #be185d;          /* Primary text color */
  --text-secondary: #9d174d;     /* Secondary text color */
  --shadow-pink: rgba(223, 103, 137, 0.2);  /* Pink shadows */
  --shadow-dark: rgba(206, 95, 126, 0.3);   /* Darker shadows */
  --hover-pink: rgba(206, 95, 126, 0.1);    /* Hover effects */
  --uncertain-gray: #6b7280;     /* For uncertain results */
  --subtext-gray: #a1a1aa;       /* For subtle text */
}
```

### Typography

The app uses Apple's system fonts for a modern look:
- **Title**: Apple System fonts with ultra-bold weight (800)
- **Body**: Inter font family for excellent readability

## Project Structure

```
catvsdog/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── web_model/              # TensorFlow.js model files
│   └── *.jpg                   # Pet icon images
├── src/
│   ├── components/
│   │   ├── ImageUpload.tsx     # Drag & drop upload component
│   │   └── ResultDisplay.tsx   # Prediction results display
│   ├── services/
│   │   └── aiService.ts        # TensorFlow.js model handling
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Styles with CSS variables
│   └── index.tsx               # App entry point
└── README.md
```

## AI Model

The app uses a custom-trained TensorFlow.js model for cat vs dog classification, trained on Google Colab:

- **Training Platform**: Google Colab with GPU acceleration
- **Model Architecture**: Custom CNN trained specifically for this project
- **Model Format**: TensorFlow.js LayersModel (converted from Python)
- **Input**: 224x224 RGB images
- **Output**: Probability scores for cat/dog classification
- **Training Dataset**: Curated cat and dog images for optimal accuracy
- **Confidence Threshold**: Displays "uncertain" for low-confidence predictions

### Model Training Process

The model was developed through the following process:

1. **Data Collection**: Curated a diverse dataset of cat and dog images
2. **Google Colab Setup**: Utilized free GPU resources for training acceleration
3. **Model Architecture**: Designed and implemented a custom CNN architecture
4. **Training & Validation**: Trained with proper train/validation splits
5. **Model Conversion**: Converted the trained model to TensorFlow.js format
6. **Web Integration**: Deployed the model for real-time browser inference

### Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- Maximum file size: 10MB

## Usage

1. **Upload an Image**: Drag and drop or click to select a photo of your pet
2. **Analyze**: Click the "Analyze Pet" button
3. **Get Results**: See if it's a cat or dog with confidence score
4. **Try Again**: Upload another image to test more pets!

## Technologies Used

- **Frontend Framework**: React 18+ with TypeScript
- **AI/ML**: TensorFlow.js for in-browser inference
- **Styling**: CSS3 with custom properties (CSS variables)
- **File Handling**: HTML5 File API with drag & drop
- **Icons**: Mix of emojis and kaomoji for cute expressions

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

*Note: Requires modern browser with ES6+ support for TensorFlow.js*

## Design Philosophy

This app combines:
- **Apple's Design Language**: Clean typography, smooth animations, premium feel
- **Kawaii Aesthetic**: Cute colors, adorable icons, friendly interface
- **Modern Web Standards**: Responsive design, accessibility, performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- TensorFlow.js team for the amazing ML framework
- The open-source community for inspiration and tools
- All the cute pets that made this project possible! 

---

Made with 💖

*Have a cute pet photo? Give it a try and see if our AI can tell if it's a meow or woof!* ₍^. .^₎⟆ 
