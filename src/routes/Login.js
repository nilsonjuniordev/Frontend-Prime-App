import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const formatCPF = (inputCPF) => {
    const numericCPF = inputCPF.replace(/\D/g, '');
    return numericCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value.toUpperCase());
  };

  const handleCPFChange = (e) => {
    const numericCPF = e.target.value.replace(/\D/g, '');
    if (numericCPF.length <= 11) {
      setCPF(formatCPF(numericCPF));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://191.184.72.124:8800/login', {
        nome,
        cpf,
      });
  
      const { token, userId } = response.data;
  
      // Adicione logs para depuração
      console.log('Token recebido após o login:', token);
      console.log('ID do usuário recebido após o login:', userId);
  
      // Verifique se o ID do usuário é definido antes de armazenar
      if (userId !== undefined) {
        // Armazenar o token e o ID do usuário no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
  
        // Redirecionar o usuário para a rota desejada
        navigate('/MyAccount');
        window.location.reload();
      } else {
        setLoginError(<div className='alertRed'>Credenciais inválidas. Verifique nome e CPF.</div>);
        console.error('ID do usuário não fornecido na resposta do servidor.');
      }
  
    } catch (error) {
      setLoginError(<div className='alertRed'>Credenciais inválidas. Verifique nome e CPF.</div>);
      console.error('Erro ao realizar login:', error.message);
    }
  };
  

  return (
    <div className='ContainerDefaultUser'>
      <Link to="/LoginUser" className="voltar">
          <p>Voltar</p> 
        </Link>

      <p style={{ color: '#fff' , textAlign: 'center'}}>
        Utilize o nome completo e CPF <br />cadastrados para acessar sua conta.
      </p><br />
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="nome" style={{ color: '#fff'}}>Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={handleNomeChange}
            placeholder='Nome completo'
          />
        </div>
        <div className="formGroup">
          <label htmlFor="cpf" style={{ color: '#fff'}}>CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            maxLength={14}
            onChange={handleCPFChange}
            placeholder='Digite seu CPF'
          />
        </div>
        <button className='btnMenu' type="submit">Entrar</button>
      </form>

      {loginError && (
        <p className="errorMessage">{loginError}</p>
      )}

      <br/>
      <Link to="/register">
          <p  style={{ color: '#fff' , textAlign: 'center'}}>Ainda não realizou o cadastro? cadastre-se agora!</p> 
        </Link></div>

  );
};

export default Login;
