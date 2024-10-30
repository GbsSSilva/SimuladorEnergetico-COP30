// DeviceManager.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DeviceManager.css';

const DeviceType = 'DEVICE';

const DeviceManager = ({ onClose }) => {
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  // Função para buscar dispositivos do Firestore
  const fetchDevices = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        const devicesSnapshot = await getDocs(collection(db, 'users', uid, 'devices'));
        const fetchedDevices = devicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDevices(fetchedDevices);
      } catch (error) {
        console.error('Erro ao buscar dispositivos:', error);
      }
    }
  };

  // Função para buscar cômodos do Firestore
  const fetchRooms = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        const roomsSnapshot = await getDocs(collection(db, 'users', uid, 'rooms'));
        const fetchedRooms = roomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRooms(fetchedRooms);
      } catch (error) {
        console.error('Erro ao buscar cômodos:', error);
      }
    }
  };

  useEffect(() => {
    fetchDevices();
    fetchRooms();
  }, []);

  const addRoom = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const newRoom = { name: `Room ${rooms.length + 1}`, devices: [] };
      const roomRef = await addDoc(collection(db, 'users', uid, 'rooms'), newRoom);
      setRooms([...rooms, { ...newRoom, id: roomRef.id }]);
    }
  };

  const handleDrop = async (device, room) => {
    const updatedRooms = rooms.map(r => {
      if (r.id === room.id) {
        const updatedRoom = { ...r, devices: [...r.devices, device] };
        return updatedRoom;
      }
      return r;
    });
    setRooms(updatedRooms);

    const user = auth.currentUser;
    if (user) {
      const roomRef = doc(db, 'users', user.uid, 'rooms', room.id);
      await updateDoc(roomRef, { devices: updatedRooms.find(r => r.id === room.id).devices });
    }

    setDevices(devices.filter(d => d.id !== device.id)); // Remove do estado local
  };

  const handleRemoveDeviceFromRoom = async (device, room) => {
    const updatedRooms = rooms.map(r => {
      if (r.id === room.id) {
        const updatedRoom = { ...r, devices: r.devices.filter(d => d.id !== device.id) };
        return updatedRoom;
      }
      return r;
    });
    setRooms(updatedRooms);

    const user = auth.currentUser;
    if (user) {
      const roomRef = doc(db, 'users', user.uid, 'rooms', room.id);
      await updateDoc(roomRef, { devices: updatedRooms.find(r => r.id === room.id).devices });
    }

    setDevices([...devices, device]); // Adiciona de volta ao estado local
  };

  const renameRoom = async (roomId, newName) => {
    const updatedRooms = rooms.map(r => (r.id === roomId ? { ...r, name: newName } : r));
    setRooms(updatedRooms);

    const user = auth.currentUser;
    if (user) {
      const roomRef = doc(db, 'users', user.uid, 'rooms', roomId);
      await updateDoc(roomRef, { name: newName });
    }
  };

  const Device = ({ device }) => {
    const [{ isDragging }, drag] = useDrag({
      type: DeviceType,
      item: device,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div ref={drag} className="device" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {device.dispositivo}
      </div>
    );
  };

  const Room = ({ room }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: DeviceType,
      drop: (device) => handleDrop(device, room),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    });

    const isActive = canDrop && isOver;
    const backgroundColor = isActive ? '#f0fff0' : '#f5f5f5';

    return (
      <div ref={drop} className="room" style={{ backgroundColor }}>
        <h3>
          {editingRoom === room.id ? (
            <input
              type="text"
              defaultValue={room.name}
              onBlur={(e) => {
                renameRoom(room.id, e.target.value);
                setEditingRoom(null);
              }}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => setEditingRoom(room.id)}>{room.name}</span>
          )}
        </h3>
        <div className="room-devices">
          {room.devices.map((device) => (
            <div
              key={device.id}
              className="room-device"
              onDoubleClick={() => handleRemoveDeviceFromRoom(device, room)}
            >
              {device.dispositivo}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="device-manager-overlay">
        <div className="device-manager">
          <button className="close-device-manager-button" onClick={onClose}>X Fechar</button>
          <button onClick={addRoom} className="add-room-button">+ Adicionar Cômodo</button>

          <h2>Dispositivos</h2>
          <div className="device-list">
            {devices.map((device) => (
              <Device key={device.id} device={device} />
            ))}
          </div>

          <h2>Cômodos</h2>
          <div className="room-list">
            {rooms.map((room) => (
              <Room key={room.id} room={room} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DeviceManager;
