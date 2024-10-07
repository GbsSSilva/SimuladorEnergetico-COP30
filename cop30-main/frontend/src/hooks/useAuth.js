import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const useAuth = () => {
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    // Firebase observer para verificar se o usuário está autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);  // Usuário está logado
      } else {
        setSigned(false); // Usuário não está logado
      }
    });

    // Cleanup da autenticação
    return () => unsubscribe();
  }, []);

  // Função de Signup (Registro)
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return null;  // Se não houver erros
    } catch (error) {
      return error.message;  // Retorna a mensagem de erro
    }
  };

  // Função de Signin (Login)
  const signin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;  // Se não houver erros
    } catch (error) {
      return error.message;  // Retorna a mensagem de erro
    }
  };

  // Função de Signout (Logout)
  const signout = async () => {
    try {
      await signOut(auth);
      setSigned(false);  // Atualiza o estado para deslogado
      return null;
    } catch (error) {
      return error.message;  // Retorna a mensagem de erro se algo der errado
    }
  };

  return { signup, signin, signout, signed };  
};

export default useAuth;
