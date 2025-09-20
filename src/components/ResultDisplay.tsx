import { PredictionResult } from '../types';

// prop type
interface ResultDisplayProps {
  result: PredictionResult | null;
  isProcessing: boolean;
}

const ResultDisplay = ({ result, isProcessing }: ResultDisplayProps) => {
  // of its loading
  if (isProcessing) {
    return (
      <div className="result-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <span>Analyzing your adorable pet... 🤔</span>
        </div>
      </div>
    );
  }

  // if no prediction is being made and there is no result => empty component
  if (!result) {
    return null;
  }

  // if we have a result
  return (
    <div className="result-container">
      <div className="result-title">
        Analysis Complete!
      </div>
      
      <div className={`result-prediction result-${result.className}`}>
        {result.className === 'cat' && 'CAT! ₍^. .^₎⟆ '}
        {result.className === 'dog' && 'DOG! ₊˚⊹ ᰔ'}
        {result.className === 'uncertain' && 'UNCERTAIN (◞‸ ◟)'}
      </div>
      
      {result.className !== 'uncertain' && (
        <>
          <div className="result-confidence">
            Confidence: {Math.round(result.confidence * 100)}%
          </div>
          
          <div className="result-message">
            {result.message}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultDisplay;
