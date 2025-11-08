import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import Assessment from './components/Assessment';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [currentStep, setCurrentStep] = useState('onboarding'); // onboarding, assessment, results
  const [userProfile, setUserProfile] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = (results) => {
    setAssessmentResults(results);
    setCurrentStep('results');
  };

  return (
    <div className="App">
      {currentStep === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {currentStep === 'assessment' && userProfile && (
        <Assessment 
          userProfile={userProfile} 
          onComplete={handleAssessmentComplete} 
        />
      )}
      
      {currentStep === 'results' && assessmentResults && (
        <ResultsDashboard 
          userProfile={userProfile}
          assessmentResults={assessmentResults}
        />
      )}
    </div>
  );
}

export default App;
