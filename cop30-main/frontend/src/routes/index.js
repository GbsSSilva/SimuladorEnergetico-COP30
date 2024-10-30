import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";  
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import AnalisePage from '../pages/Analise/Analise';
import EnergyQuestionnaire from '../pages/Questions/EnergyQuestionnaire';

// Função para verificar a autenticação
const Private = ({ Item }) => {
  const { signed } = useAuth();  // O hook de autenticação deve retornar o estado correto (true ou false)

  return signed ? <Item /> : <Signin />;  
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          {/* Rota privada, redireciona para Signin se não autenticado */}
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
          <Route path="/analise" element={<AnalisePage />} />
          <Route path="/questionário" element={<EnergyQuestionnaire />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
