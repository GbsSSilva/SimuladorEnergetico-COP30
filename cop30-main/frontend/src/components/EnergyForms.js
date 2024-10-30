import React, { useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const EnergyForms = ({ addDevice }) => {
  const [dispositivo, setDispositivo] = useState('');
  const [tempoUso, setTempoUso] = useState('');
  const [unidadeTempo, setUnidadeTempo] = useState('horas');
  const [potencia, setPotencia] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Lista de dispositivos sugeridos com respectivas potências
  // Lista de dispositivos sugeridos com respectivas potências
  const allDevices = [
    { nome: 'TV LCD 32', potencia: 150 },
    { nome: 'TV LCD 22', potencia: 100 },
    { nome: 'TV LCD 37', potencia: 180 },
    { nome: 'TV TUBO 14', potencia: 120 },
    { nome: 'TV TUBO 20', potencia: 140 },
    { nome: 'TV TUBO 21', potencia: 150 },
    { nome: 'TV TUBO 29', potencia: 200 },
    { nome: 'TV PLASMA 42', potencia: 300 },
    { nome: 'TV PLASMA 50', potencia: 350 },
    { nome: 'TV LED 32', potencia: 50 },
    { nome: 'TV LED 46', potencia: 70 },
    { nome: 'TV LED 55', potencia: 90 },
    { nome: 'Ar Condicionado 9500 BTU', potencia: 1100 },
    { nome: 'Ar Condicionado 12000 BTU', potencia: 1400 },
    { nome: 'Ar Condicionado 7500 BTU', potencia: 800 },
    { nome: 'Geladeira', potencia: 200 }, 
    { nome: 'Forno Micro-ondas', potencia: 1200 },
    { nome: 'Computador', potencia: 250 },
    { nome: 'Lâmpada Incandescente 60W', potencia: 60 },
    { nome: 'Lâmpada Fluorescente 15W', potencia: 15 },
    { nome: 'Lâmpada LED 10W', potencia: 10 },
    { nome: 'Secador de Cabelo', potencia: 1500 },
    { nome: 'Ferro de Passar', potencia: 1000 },
    { nome: 'Aspirador de Pó', potencia: 1400 },
    { nome: 'Lavadora de Roupas', potencia: 500 },
    { nome: 'Lava-louças', potencia: 1500 },
    { nome: 'Chuveiro Elétrico', potencia: 5500 },
    { nome: 'Máquina de Café', potencia: 800 },
    { nome: 'Torradeira', potencia: 850 },
    { nome: 'Ventilador', potencia: 100 },
    { nome: 'Aquecedor Elétrico', potencia: 2000 },
    { nome: 'Purificador de Água', potencia: 60 },
    { nome: 'Impressora', potencia: 50 },
    { nome: 'Carregador de Celular', potencia: 10 },
    { nome: 'Roteador Wi-Fi', potencia: 20 },
    { nome: 'Consola de Videogame', potencia: 250 },
    { nome: 'Máquina de Lavar Louça', potencia: 1800 },
    { nome: 'Freezer', potencia: 300 },
    { nome: 'Liquidificador', potencia: 600 },
    { nome: 'Batedeira', potencia: 400 },
    { nome: 'Fritadeira Elétrica (Air Fryer)', potencia: 1500 },
    { nome: 'Cafeteira Expresso', potencia: 1450 },
    { nome: 'Desumidificador', potencia: 600 },
    { nome: 'Luminária de Mesa LED', potencia: 5 },
    { nome: 'Playstation 5', potencia: 200 },
    { nome: 'Xbox Series X', potencia: 180 },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDispositivo(value);

    if (value.length > 0) {
      const filteredSuggestions = allDevices.filter((device) =>
        device.nome.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setDispositivo(suggestion.nome);
    setPotencia(suggestion.potencia);
    setSuggestions([]);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dispositivo || !tempoUso || !potencia || !quantidade) {
      setErrorMessage('Por favor, preencha todos os campos antes de submeter o formulário.');
      return;
    }

    const newDevice = {
      dispositivo,
      tempo_uso: tempoUso,
      unidade_tempo: unidadeTempo,
      potencia,
      quantidade,
    };

    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        const docRef = await addDoc(collection(db, 'users', uid, 'devices'), newDevice);
        console.log('Dados do dispositivo salvos com sucesso no Firestore', docRef.id);
        addDevice({ ...newDevice, id: docRef.id });

        // Limpar os campos após a submissão
        setDispositivo('');
        setTempoUso('');
        setUnidadeTempo('horas');
        setPotencia('');
        setQuantidade('');
        setErrorMessage('');
      } catch (error) {
        console.error('Erro ao salvar o dispositivo no Firestore:', error);
      }
    } else {
      console.error('Usuário não autenticado.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="dispositivo">Dispositivo:</label>
          <input
            type="text"
            id="dispositivo"
            value={dispositivo}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
            placeholder="Digite o nome do dispositivo"
          />
          {isFocused && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.nome}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tempoUso">Tempo de uso:</label>
          <div className="tempo-uso">
            <input
              type="number"
              id="tempoUso"
              value={tempoUso}
              onChange={(e) => setTempoUso(e.target.value)}
              placeholder="Digite a quantidade"
            />
            <select
              value={unidadeTempo}
              onChange={(e) => setUnidadeTempo(e.target.value)}
            >
              <option value="horas">horas/dia</option>
              <option value="minutos">min/dia</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="potencia">Potência (W/h):</label>
          <input
            type="number"
            id="potencia"
            value={potencia}
            onChange={(e) => setPotencia(e.target.value)}
            placeholder="W/h"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Quantidade"
          />
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default EnergyForms;
