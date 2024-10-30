// components/DeviceManagerButton.js
import React, { useState } from 'react';
import DeviceManager from './DeviceManager'; // Importa o DeviceManager
import './DeviceManagerButton.css';

const DeviceManagerButton = ({ devices, addDevice, removeDevice }) => {
  const [isDeviceManagerOpen, setIsDeviceManagerOpen] = useState(false);

  const toggleDeviceManager = () => {
    setIsDeviceManagerOpen(!isDeviceManagerOpen);
  };

  const closeDeviceManager = () => {
    setIsDeviceManagerOpen(false);
  };

  return (
    <div className="device-manager-button-container">
      <button className="device-manager-button" onClick={toggleDeviceManager}>
        Gerenciar Dispositivos
      </button>
      {isDeviceManagerOpen && (
        <DeviceManager
          devices={devices}
          addDevice={addDevice}
          removeDevice={removeDevice}
          onClose={closeDeviceManager} // Passa a função de fechar
        />
      )}
    </div>
  );
};

export default DeviceManagerButton;
