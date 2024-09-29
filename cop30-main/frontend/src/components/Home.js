

import React, { useState, useEffect } from 'react';
import "./Home.css"
import axios from 'axios';
import EnergyForms from './EnergyForms';
import DeviceTable from './DeviceTable';

const Home = () => {

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
    <div id='content'>
        <section id="home">
        <div class="shape"></div>
        <div id="cta">

            <h1 class="title">
            Economize energia, 
                <span> cuide do futuro.</span>
            </h1>

            <p class="description">
            Aqui você aprende como economizar energia elétrica de forma simples e prática. Preencha o formulário ao lado e descubra seu gasto de energia doméstico.
            </p>

            
              <div id="cta_buttons">
                <a href="https://www.gov.br/planalto/pt-br/agenda-internacional/missoes-internacionais/cop28/cop-30-no-brasil" id="phone_button">
                    <button class="btn-default">
                        <i class="fa-solid fa-location-dot"></i>
                    </button>
                    Acesse COP 30
                </a>

                <a href="https://www.unama.br/institucional/nacional" id="phone_button">
                    <button class="btn-default">
                        <i class="fa-solid fa-phone"></i>
                    </button>
                    UNAMA
                </a>
              </div>

              
        </div>

        <div id="Formulario">
        <div className="forms-container">
        <EnergyForms addDevice={addDevice} />
       

        <div className="footer-content">
        <DeviceTable devices={devices} setDevices={setDevices} />
          <h2>Custo total em Reais no mês:</h2>
          <p>R$: {calcularCustoTotal()}</p>
        </div>

        </div>

        

        </div>

        
        
        

        </section>
    </div>
  )
}

export default Home