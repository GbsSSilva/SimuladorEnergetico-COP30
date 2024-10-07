import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { db, auth } from '../../firebase/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; // Corrija o caminho
import {
  AnalysisContainer,
  AnalysisTitle,
  ChartSection,
  SolarRecommendation,
  SolarTitle,
  SolarText,
  DicasSection,
  DicasTitle,
  DicasList,
  DicasItem,
  RefazerButton,
  HomeButton
} from './styles';

const AnalisePage = () => {
  const [dadosDispositivos, setDadosDispositivos] = useState([]);
  const [dicas, setDicas] = useState([]);
  const [respostasQuestionario, setRespostasQuestionario] = useState({});
  const [numeroDePlacas, setNumeroDePlacas] = useState(0);
  const [economiaMensal, setEconomiaMensal] = useState(0);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevicesAndQuestionnaire = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;

        const deviceSnapshot = await getDocs(collection(db, 'users', uid, 'devices'));
        const dispositivos = deviceSnapshot.docs.map(doc => doc.data());

        const questionnaireSnapshot = await getDocs(collection(db, 'users', uid, 'questionnaire'));
        const respostas = questionnaireSnapshot.docs[0]?.data() || {};

        setDadosDispositivos(dispositivos);
        setRespostasQuestionario(respostas);
        calcularRecomendacoes(dispositivos, respostas);
        setLoading(false);
      }
    };

    const calcularRecomendacoes = (dispositivos, respostas) => {
      let consumoTotal = 0;

      dispositivos.forEach((device) => {
        const { potencia, tempo_uso, quantidade, unidade_tempo } = device;
        const tempoUsoHoras = unidade_tempo === 'minutos' ? tempo_uso / 60 : tempo_uso;
        consumoTotal += (potencia * tempoUsoHoras * quantidade) / 1000;
      });

      const placasNecessarias = Math.ceil(consumoTotal / 30);
      setNumeroDePlacas(placasNecessarias);

      const economia = consumoTotal * 0.9;
      setEconomiaMensal(economia);

      const novasDicas = [];

      if (consumoTotal > 1000) {
        novasDicas.push('Seu consumo é muito alto. Considere trocar seus aparelhos antigos por mais eficientes.');
      }

      if (respostas.usaEnergiaRenovavel === 'Não') {
        novasDicas.push('Você não utiliza energia renovável. Considere a instalação de placas solares para reduzir o consumo.');
      }

      if (respostas.aparelhosAntigos === 'Sim') {
        novasDicas.push('Você mencionou que utiliza aparelhos elétricos antigos. Aparelhos mais modernos costumam ser mais eficientes.');
      }

      if (respostas.frequenciaRevisao === 'Nunca') {
        novasDicas.push('Você não revisa seu consumo de energia. Revisões regulares podem ajudar a identificar desperdícios.');
      }

      if (placasNecessarias > 5) {
        novasDicas.push('Você poderia se beneficiar de um sistema solar. Recomendamos instalar ao menos 5 placas solares.');
      }

      setDicas(novasDicas);
    };

    fetchDevicesAndQuestionnaire();
  }, []);

  const refazerQuestionario = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;

      const questionnaireSnapshot = await getDocs(collection(db, 'users', uid, 'questionnaire'));
      questionnaireSnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, 'users', uid, 'questionnaire', docSnapshot.id));
      });

      navigate('/questionário');
    }
  };

  const voltarParaHome = () => {
    navigate('/home');
  };

  const data = [
    ['Dispositivo', 'Consumo (kWh)'],
    ...dadosDispositivos.map((device) => [
      device.dispositivo,
      (device.potencia * device.tempo_uso * device.quantidade) / 1000,
    ]),
  ];

  if (loading) {
    return (
      <AnalysisContainer>
        <LoadingSpinner /> {/* Mostra o spinner enquanto carrega */}
      </AnalysisContainer>
    );
  }

  return (
    <AnalysisContainer>
      <AnalysisTitle>Análise de Consumo Energético</AnalysisTitle>

      <ChartSection>
        <Chart
          chartType="BarChart"
          data={data}
          options={{
            title: 'Consumo de Energia por Dispositivo',
            chartArea: { width: '50%' },
            hAxis: {
              title: 'Consumo em kWh',
              minValue: 0,
            },
            vAxis: {
              title: 'Dispositivo',
            },
            colors: ['#00af5b'],
          }}
          width="100%"
          height="400px"
        />
      </ChartSection>

      <SolarRecommendation>
        <SolarTitle>Recomendações para Energia Solar</SolarTitle>
        <SolarText>
          Com base no seu consumo, recomendamos a instalação de <strong>{numeroDePlacas}</strong> placas solares.
        </SolarText>
        <SolarText>
          Isso geraria uma economia mensal de aproximadamente <strong>R${economiaMensal.toFixed(2)}</strong>.
        </SolarText>
      </SolarRecommendation>

      <DicasSection>
        <DicasTitle>Dicas para Reduzir o Consumo</DicasTitle>
        <DicasList>
          {dicas.map((dica, index) => (
            <DicasItem key={index}>{dica}</DicasItem>
          ))}
        </DicasList>
      </DicasSection>

      <RefazerButton onClick={refazerQuestionario}>
        Refazer Questionário
      </RefazerButton>

      <HomeButton onClick={voltarParaHome}>
        Voltar para o Home
      </HomeButton>
    </AnalysisContainer>
  );
};

export default AnalisePage;
