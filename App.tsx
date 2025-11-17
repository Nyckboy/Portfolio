
import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HomeScreen from './components/HomeScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a base background color, although the gradient will cover it.
    document.body.className = 'bg-black';
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen">
      {isLoading ? (
        <LoadingScreen onLoaded={handleLoadingComplete} />
      ) : (
        <div className="animated-gradient">
          <HomeScreen />
        </div>
      )}
    </div>
  );
};

export default App;
