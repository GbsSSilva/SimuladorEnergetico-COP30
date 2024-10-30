import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './AnalysisButton.css'; 

const AnalysisButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="analysis-button"  
      onClick={() => navigate('/questionário')}
    >
      Análise Aprofundada
    </button>
  );
};

export default AnalysisButton;
