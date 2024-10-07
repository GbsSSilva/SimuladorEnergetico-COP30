import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebase'; 
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import {
    BodyContainer,
    MainBackground,
    QuestionnaireContainer,
    QuestionTitle,
    QuestionContainer,
    QuestionText,
    RadioContainer,
    RadioLabel,
    ButtonContainer,
    Button,
    HomeButton,
    ErrorMessage,
    ResponsiveContainer,
  } from './styles'; //

const questions = [
  {
    id: 1,
    text: 'Você utiliza algum tipo de energia renovável em sua residência?',
    name: 'usaEnergiaRenovavel',
    options: ['Sim', 'Não', 'Planejo instalar']
  },
  {
    id: 2,
    text: 'Qual é o tamanho da sua residência?',
    name: 'tamanhoResidencia',
    options: ['Pequena (até 50m²)', 'Média (50m² - 100m²)', 'Grande (acima de 100m²)']
  },
  {
    id: 3,
    text: 'Quantas pessoas moram na residência?',
    name: 'numeroPessoas',
    options: ['1-2 pessoas', '3-4 pessoas', 'Mais de 4 pessoas']
  },
  {
    id: 4,
    text: 'Qual é o principal horário de uso de dispositivos eletrônicos?',
    name: 'horarioUso',
    options: ['Manhã', 'Tarde', 'Noite', 'O dia todo']
  },
  {
    id: 5,
    text: 'Você costuma deixar aparelhos eletrônicos em modo standby (ligados na tomada mesmo quando não estão em uso)?',
    name: 'standby',
    options: ['Sim', 'Não']
  },
  {
    id: 6,
    text: 'Você já utiliza algum programa ou dispositivo de automação para otimizar o uso de energia elétrica (ex: sensores de movimento para iluminação, controle remoto para ar-condicionado)?',
    name: 'automacao',
    options: ['Sim', 'Não']
  },
  {
    id: 7,
    text: 'Você utiliza aparelhos elétricos antigos (mais de 5 anos) com frequência?',
    name: 'aparelhosAntigos',
    options: ['Sim', 'Não']
  },
  {
    id: 8,
    text: 'Qual é a principal fonte de aquecimento da sua residência?',
    name: 'fonteAquecimento',
    options: ['Aquecedor elétrico', 'Aquecedor a gás', 'Painel solar', 'Não uso aquecimento']
  },
  {
    id: 9,
    text: 'Qual tipo de iluminação é mais comum em sua casa?',
    name: 'tipoIluminacao',
    options: ['Lâmpadas incandescentes', 'Lâmpadas fluorescentes', 'Lâmpadas LED']
  },
  {
    id: 10,
    text: 'Com que frequência você revisa o consumo de energia elétrica de sua residência?',
    name: 'frequenciaRevisao',
    options: ['Mensalmente', 'Raramente', 'Nunca']
  }
];

const EnergyQuestionnaire = () => {
  const [respostas, setRespostas] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Substitui useHistory

  // Verificar se o usuário já respondeu o questionário
  useEffect(() => {
    const fetchQuestionnaire = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const querySnapshot = await getDocs(collection(db, 'users', uid, 'questionnaire'));
        if (!querySnapshot.empty) {
          // Redirecionar para a página de análise se o questionário já foi respondido
          navigate('/analise');
        }
      }
    };

    fetchQuestionnaire();
  }, [navigate]);

  const handleOptionSelect = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    setRespostas({ ...respostas, [currentQuestion.name]: option });
    setErrorMessage('');
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!respostas[currentQuestion.name]) {
      setErrorMessage('Por favor, escolha uma opção antes de continuar.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setErrorMessage(''); // Limpa qualquer mensagem de erro quando voltar
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;

      // Apagar respostas anteriores
      const querySnapshot = await getDocs(collection(db, 'users', uid, 'questionnaire'));
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, 'users', uid, 'questionnaire', docSnapshot.id));
      });

      try {
        // Salvar as novas respostas no Firestore
        await addDoc(collection(db, 'users', uid, 'questionnaire'), respostas);
        navigate('/analise'); 
      } catch (error) {
        console.error('Erro ao salvar o questionário:', error);
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
<BodyContainer>
      <MainBackground>
        <QuestionnaireContainer>
          <QuestionTitle>Questionário de Consumo Energético</QuestionTitle>
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionText>{currentQuestion.text}</QuestionText>
            {currentQuestion.options.map((option, index) => (
              <RadioContainer key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={currentQuestion.name}
                  value={option}
                  checked={respostas[currentQuestion.name] === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <RadioLabel htmlFor={`option-${index}`}>{option}</RadioLabel>
              </RadioContainer>
            ))}
          </motion.div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ButtonContainer>
            {currentQuestionIndex > 0 && (
              <Button onClick={handleBack}>Voltar Questão</Button>
            )}
            <Button onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? 'Próxima' : 'Concluir'}
            </Button>
          </ButtonContainer>
        </QuestionnaireContainer>
        <HomeButton onClick={() => navigate('/home')}>Voltar para o Home</HomeButton>
      </MainBackground>
    </BodyContainer>
  );
};

export default EnergyQuestionnaire;
