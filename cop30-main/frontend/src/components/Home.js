import React, { useState, useEffect } from 'react';
import "./Home.css";
import { db, auth } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import EnergyForms from './EnergyForms';
import DeviceTable from './DeviceTable';

const Home = () => {
  const [devices, setDevices] = useState([]);

  // Função para buscar os dispositivos do Firestore quando a página carregar
  const fetchUserData = async () => {
    const user = auth.currentUser;
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
        console.error('Erro ao buscar os dados do Firestore:', error);
      }
    }
  };

  // Resgatar dados ao montar o componente
  useEffect(() => {
    fetchUserData();
  }, []);

  // Função para adicionar um novo dispositivo à lista
  const addDevice = (newDevice) => {
    setDevices((prevDevices) => [...prevDevices, newDevice]);
  };

  // Função para calcular o custo total
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

  return (
    <div id="content">
      <section id="home">
        <div className="shape"></div>
        <div id="cta">
          <h1 className="title">
            Economize energia, <span>cuide do futuro.</span>
          </h1>
          <p className="description">
            Aqui você aprende como economizar energia elétrica de forma simples e prática. Preencha o formulário ao lado e descubra seu gasto de energia doméstico.
          </p>
          <div id="cta_buttons">
            <a href="https://www.gov.br/planalto/pt-br/agenda-internacional/missoes-internacionais/cop28/cop-30-no-brasil" id="phone_button">
              <button className="btn-default">
                <i className="fa-solid fa-location-dot"></i>
              </button>
              Acesse COP 30
            </a>
            <a href="https://www.unama.br/institucional/nacional" id="phone_button">
              <button className="btn-default">
                <i className="fa-solid fa-phone"></i>
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
  );
};

export default Home;
