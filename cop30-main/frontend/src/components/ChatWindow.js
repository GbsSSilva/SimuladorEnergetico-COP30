import React from 'react';


const ChatWindow = ({ isOpen, toggleChat }) => {
  return (
    <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
      <div className="chat-header">
        <h4>Retire suas dúvidas</h4>
        <button className="close-button" onClick={toggleChat}>X</button> {/* Botão de fechar */}
      </div>
      <div className="chat-body">
        <p>Este é o chat. Fale com nosso bot para retirar suas dúvidas!</p>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="chat-input"
        />
        <button className="chat-send-button">Enviar</button>
      </div>
    </div>
  );
};

export default ChatWindow;
