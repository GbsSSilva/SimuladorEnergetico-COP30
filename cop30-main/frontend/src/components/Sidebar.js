// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>
        &times;
      </button>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/energy">Criar plano de energia</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
