import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import './Device.css';

const Device = ({ device, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DEVICE',
    item: { id: device.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className="device"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {device.name}
      <button onClick={onRemove} className="remove-device-button">x</button>
    </motion.div>
  );
};

export default Device;
