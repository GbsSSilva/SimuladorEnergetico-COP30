import styled from "styled-components";

// Estilo para o container principal da página de análise
export const AnalysisContainer = styled.div`
  background-color: #fcf6e9;
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

// Estilo para o título principal da página
export const AnalysisTitle = styled.h2`
  color: #2d4a60;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

// Estilo para a seção do gráfico
export const ChartSection = styled.div`
  margin-bottom: 40px;
`;

// Estilo para a recomendação de energia solar
export const SolarRecommendation = styled.div`
  background-color: #e8f351;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

export const SolarTitle = styled.h3`
  color: #2d4a60;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const SolarText = styled.p`
  color: #2d4a60;
  font-size: 1.2rem;
`;

// Estilo das dicas para reduzir o consumo
export const DicasSection = styled.div`
  background-color: #a5d6a7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

export const DicasTitle = styled.h3`
  color: #2e7d32;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

export const DicasList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const DicasItem = styled.li`
  background-color: #c8e6c9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #2e7d32;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
`;

// Estilo para o botão de interação
export const Button = styled.button`
  background-color: #00af5b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008f4c;
  }
`;

// Estilo para o botão de refazer questionário
export const RefazerButton = styled(Button)`
  background-color: #007bff;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;


export const HomeButton = styled(Button)`
  background-color: #007bff; 
  margin-top: 10px;

  &:hover {
    background-color: #0056b3; 
  }
`;

