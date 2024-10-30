import React, { useState, useEffect } from 'react';
import '../../App.css';
import Header from '../../components/Header';
import HomeContent from '../../components/Home';
import Economize from '../../components/Economize';
import COP30 from '../../components/COP30';
import Footer from '../../components/Footer';
import ChatbotIcon from '../../components/ChatbotIcon';
import ChatWindow from '../../components/ChatWindow';
import Sidebar from '../../components/Sidebar';
import AnalysisButton from '../../components/AnalysisButton';
import DeviceManagerButton from '../../components/DeviceManagerButton';
import { db, auth } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [devices, setDevices] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Função para buscar os dispositivos do Firestore ao carregar
  useEffect(() => {
    const fetchUserDevices = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const uid = user.uid;
          try {
            const querySnapshot = await getDocs(collection(db, 'users', uid, 'devices'));
            const devicesData = [];
            querySnapshot.forEach((doc) => {
              devicesData.push({ id: doc.id, ...doc.data() });
            });
            setDevices(devicesData);
          } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
          }
        }
      });

      return () => unsubscribe();
    };

    fetchUserDevices();
  }, []);

  // Função para adicionar dispositivos ao Firestore
  const addDevice = async (newDevice) => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        const docRef = await addDoc(collection(db, 'users', uid, 'devices'), newDevice);
        setDevices([...devices, { ...newDevice, id: docRef.id }]);
      } catch (error) {
        console.error('Erro ao adicionar dispositivo:', error);
      }
    }
  };

  // Função para remover dispositivos do Firestore
  const removeDevice = async (deviceId) => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        await deleteDoc(doc(db, 'users', uid, 'devices', deviceId));
        setDevices(devices.filter(device => device.id !== deviceId));
      } catch (error) {
        console.error('Erro ao remover dispositivo:', error);
      }
    }
  };

  // Função para calcular o custo total dos dispositivos
  const calcularCustoTotal = () => {
    const diasNoMes = 30;
    return devices.reduce((total, device) => {
      const horasUso = device.unidade_tempo === 'minutos' ? device.tempo_uso / 60 : device.tempo_uso;
      const consumoKwhDiario = (device.potencia * horasUso * device.quantidade) / 1000;
      const consumoMensalKwh = consumoKwhDiario * diasNoMes;
      const custo = consumoMensalKwh * 0.93845;
      return total + (custo >= 0 ? custo : 0);
    }, 0).toFixed(2);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Componentes de conteúdo do site */}
        <HomeContent addDevice={addDevice} removeDevice={removeDevice} devices={devices} calcularCustoTotal={calcularCustoTotal} />
        <Economize />
        <COP30 />
        <Footer />
        <AnalysisButton />
        <DeviceManagerButton devices={devices} addDevice={addDevice} removeDevice={removeDevice} />


        {/* Chatbot */}
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
