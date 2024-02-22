import React,{useState} from 'react';
import './App.css';
import Weather from './component/Weather';
import LoadingBar from 'react-top-loading-bar';


function App() {

  const [progress, setProgress] = useState(0)

  return (
    <div className="App">
       <LoadingBar color='#f11946' height={3}  progress={progress} onLoaderFinished={() => setProgress(0)}/>
     <Weather setProgress ={setProgress}/>
    </div>
  );
}

export default App;