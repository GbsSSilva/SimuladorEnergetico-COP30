import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';  // Importa a função para deletar do Firestore
import { db, auth } from '../firebase/firebase';      // Certifique-se de importar a instância do Firestore e a autenticação

const DeviceTable = ({ devices, setDevices }) => {
  const diasNoMes = 30; // Considerando 30 dias no mês

  // Função para remover um dispositivo do Firestore
  const removeDeviceFromFirestore = async (deviceId) => {
    const user = auth.currentUser;  // Pega o usuário autenticado
    if (user && deviceId) {  // Verifica se o usuário está autenticado e o deviceId está presente
      const uid = user.uid;
      try {
        const deviceRef = doc(db, 'users', uid, 'devices', deviceId);  // Caminho do documento no Firestore
        await deleteDoc(deviceRef);  // Deletar o documento do Firestore
        console.log('Dispositivo removido do Firestore com sucesso');
      } catch (error) {
        console.error('Erro ao remover o dispositivo do Firestore:', error);
      }
    } else {
      console.error('Usuário não autenticado ou deviceId indefinido.');
    }
  };

  // Função para remover o dispositivo da tabela e do Firestore
  const handleRemoveDevice = async (index, deviceId) => {
    if (deviceId) {
      const user = auth.currentUser;
      if (user) {
        try {
          await removeDeviceFromFirestore(deviceId);  // Primeiro, remova do Firestore
          const newDevices = devices.filter((_, i) => i !== index);  // Remova da lista local
          setDevices(newDevices);  // Atualiza o estado com a lista sem o dispositivo removido
        } catch (error) {
          console.error('Erro ao remover o dispositivo:', error);
        }
      }
    }
  };

  return (
    <div className="device-table">
      <table>
        <thead>
          <tr>
            <th>Dispositivo</th>
            <th>Potência (W/h)</th>
            <th>Tempo de uso</th>
            <th>Quantidade</th>
            <th>Custo médio no mês (R$)</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {devices.length > 0 ? (
            devices.map((device, index) => {
              let horasUso;

              // Se a unidade for minutos, converte para horas
              if (device.unidade_tempo === 'minutos') {
                horasUso = device.tempo_uso / 60; // Converte minutos para horas
              } else {
                horasUso = device.tempo_uso; // Tempo já em horas
              }

              // Calcula o consumo em kWh diário
              const consumoKwhDiario = (device.potencia * horasUso * device.quantidade) / 1000;
              // Calcula o consumo mensal multiplicando pelos dias do mês
              const consumoMensalKwh = consumoKwhDiario * diasNoMes;
              // Calcula o custo com base na tarifa de R$ 0,93845 por kWh
              const custo = consumoMensalKwh * 0.93845;

              return (
                <tr key={index}>
                  <td>{device.dispositivo}</td>
                  <td>{device.potencia}</td>
                  <td>
                    {device.tempo_uso} {device.unidade_tempo === 'minutos' ? 'min/dia' : 'horas/dia'}
                  </td>
                  <td>{device.quantidade}</td>
                  <td>{custo.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemoveDevice(index, device.id)}>X</button> {/* Passe o ID correto */}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">Nenhum dispositivo adicionado ainda</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
