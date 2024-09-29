// src/components/Header.js

import "./header.css"

import React from 'react';

import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";


const Header = ({ toggleSidebar }) => {

    const { signout } = useAuth();
    const navigate = useNavigate();
    
  return (
    <header>
        <nav id="navbar">
            <i id="nav_logo"> COP30 Sustentável<p>Consumo energético Consciente</p></i>

            <ul id="nav_list">
                <li class="nav-item active">
                    <a href="#home">Inicio</a>
                </li>
                <li class="nav-item">
                    <a href="#servicos">Como Economizar</a>
                </li>
                <li class="nav-item">
                    <a href="#testimonials">Sobre a COP-30</a>
                </li>
                
            </ul>

            <div id="cta_header">
                <Button Text="Voltar para o login" onClick={() => [signout(), navigate("/")]}>
                Sair
                </Button>
             </div>

            <button id="mobile_btn">
                <i class="fa-solid fa-bars"></i>
            </button>

        </nav>

        <div id="mobile_menu">
            <ul id="mobile_nav_list">
                <li class="nav-item">
                    <a href="#home">Inicio</a>
                </li>
                <li class="nav-item">
                    <a href="#servicos">Serviços</a>
                </li>
                <li class="nav-item">
                    <a href="#sobre">Sobre</a>
                </li>
                <li class="nav-item">
                    <a href="#contato">Contato</a>
                </li>
            </ul>

        </div>
    </header>
  );
};

export default Header;
