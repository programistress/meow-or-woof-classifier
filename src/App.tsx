import './App.css';

function App() {
  return (
    <div className="container">
    <h1>Meow or Woof Recognizer</h1>
    <p>Upload an image of a cat or dog to see if it's a cat or a dog.</p>
    <input type="file" accept="image/*" />
    <button>Upload</button>
    <p>Result: </p>
    </div>
  );
}

export default App;
