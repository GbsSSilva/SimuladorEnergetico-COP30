import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import Header from '../../components/Header';
import Home from '../../components/Home';
import Economize from '../../components/Economize';
import COP30 from '../../components/COP30';
import Footer from '../../components/Footer';
import ChatbotIcon from '../../components/ChatbotIcon';
import ChatWindow from '../../components/ChatWindow'; 
import Sidebar from '../../components/Sidebar';

function App() {
  
  // Inicialize o estado dos dispositivos carregando os dados do localStorage
  const [devices, setDevices] = useState(() => {
    const savedDevices = localStorage.getItem('devices');
    return savedDevices ? JSON.parse(savedDevices) : [];
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Salvar dispositivos no localStorage sempre que o estado de dispositivos for atualizado
  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  // Função para buscar os dispositivos do backend quando a página carregar
  useEffect(() => {
    axios.get('http://localhost:8000/api/devices/')
      .then((response) => {
        setDevices(response.data);  // Atualiza o estado com os dispositivos retornados do backend
      })
      .catch((error) => {
        console.error('Error fetching devices:', error);
      });
  }, []);  // O array vazio [] garante que o hook seja executado apenas ao montar o componente

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Função para adicionar um novo dispositivo à lista
  const addDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  const calcularCustoTotal = () => {
    const diasNoMes = 30;

    return devices.reduce((total, device) => {
      let horasUso;

      if (device.unidade_tempo === 'minutos') {
        horasUso = device.tempo_uso / 60;
      } else {
        horasUso = device.tempo_uso;
      }

      const consumoKwhDiario = (device.potencia * horasUso * device.quantidade) / 1000;
      const consumoMensalKwh = consumoKwhDiario * diasNoMes;
      const custo = consumoMensalKwh * 0.93845;

      return total + (custo >= 0 ? custo : 0);
    }, 0).toFixed(2);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />
      <Home/>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Economize/>
      <COP30/>
      <Footer/>

      <div className="chatbot-container">
        <button className="chatbot-button" onClick={toggleChat}>
          <ChatbotIcon size={40} color="#2E7D32" />
        </button>

        <ChatWindow isOpen={isChatOpen} toggleChat={toggleChat} />
      </div>
    </div>
  );
}

export default App;
