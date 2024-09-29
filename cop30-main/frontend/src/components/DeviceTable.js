import React from 'react';

const DeviceTable = ({ devices, setDevices }) => {
  const diasNoMes = 30; // Considerando 30 dias no mês

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
                    <button onClick={() => {
                      const newDevices = devices.filter((_, i) => i !== index);
                      setDevices(newDevices);
                    }}>X</button>
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
