import React from 'react';

const ChatbotIcon = ({ size = 24, color = '#2E7D32' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 2.42 1.01 4.61 2.64 6.2L2 22l3.8-2.66C7.4 20.99 9.6 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm3 13h-6v-2h6v2zm2-4H7V9h10v2z"/>
    </svg>
  );
};

export default ChatbotIcon;
