import React from 'react';
import './App.css';
import TrackingScreen from './components/TrackingScreen';
import CalCarbonTrackerProvider from './context/CalCarbonTrackerProvider';

const App = () => {
  return (
    <div className="App">
      <CalCarbonTrackerProvider>
        <TrackingScreen />
      </CalCarbonTrackerProvider>
    </div>
  );
}

export default App;
