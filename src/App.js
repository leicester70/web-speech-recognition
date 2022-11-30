import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Dictaphone from "./components/Dictaphone/Dictaphone"

import './App.css';
import '@fontsource/roboto/300.css';

function App() {
  return (
    <div className="app">
      <div className="content">
        <Dictaphone></Dictaphone>
      </div>
    </div>
  );
}

export default App;
