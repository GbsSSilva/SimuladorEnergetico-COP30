import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";  // Certifique-se de que o caminho está correto
import { FcGoogle } from "react-icons/fc";  // Importando o ícone do Google

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      // Fazendo login com email e senha
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado:", userCredential.user);

      // Redirecionando para a página principal ou home após login
      navigate("/home");  // Verifique se a rota "/home" existe
    } catch (error) {
      console.error("Erro ao logar:", error.message);
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Fazendo login com a conta do Google
      const result = await signInWithPopup(auth, provider);
      console.log("Usuário logado com Google:", result.user);

      // Redirecionando para a página principal ou home após login
      navigate("/home");
    } catch (error) {
      console.error("Erro ao logar com Google:", error.message);
      setError("Falha no login com Google.");
    }
  };

  return (
    <C.Container>
      <C.Label>COP-30 Sustentável</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        
        {/* Botão de login com Google com ícone */}
        <C.GoogleButton onClick={handleGoogleLogin}>
          <FcGoogle size={24} /> {/* Tamanho do ícone */}
          <span>Entrar com Google</span>
        </C.GoogleButton>
        
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
