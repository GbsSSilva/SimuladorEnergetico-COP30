import React from 'react';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import './Room.css';

const Room = ({ room, devicesInRoom, onDropDevice, onRemoveDevice }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'DEVICE',
    drop: (item) => onDropDevice(item.id, room.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <motion.div
      ref={drop}
      className={`room ${isOver ? 'room-hover' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>{room.name}</h3>
      <div className="room-devices">
        {devicesInRoom.map((device) => (
          <motion.div
            key={device.id}
            className="room-device"
            layout
            whileHover={{ scale: 1.1 }}
            onClick={() => onRemoveDevice(device.id, room.id)} // Remover dispositivo do cômodo
          >
            {device.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Room;
