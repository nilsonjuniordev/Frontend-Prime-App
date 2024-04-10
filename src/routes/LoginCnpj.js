import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginCnpj = () => {
  const [nome, setNome] = useState('');
  const [pass, setPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();


  const handleNomeChange = (e) => {
    setNome(e.target.value.toUpperCase());
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post('https://191.184.72.124:8800/loginCnpj', {
        nome,
        pass,
      });

      const {  userId } = response.data;

      if (userId !== undefined) {
       localStorage.setItem("specificToken", response.data.token);
        localStorage.setItem('userId', userId);

        navigate('/AdminRH');
        window.location.reload();
      } else {
        setLoginError(<div className='alertRed'>Credenciais inválidas. Verifique nome e Senha.</div>);
        console.error('ID do usuário não fornecido na resposta do servidor.');
      }

    } catch (error) {
      setLoginError(<div className='alertRed'>Credenciais inválidas. Verifique nome e Senha.</div>);
      console.error('Erro ao realizar login:', error.message);
    }
  };

  return (
    <div className='ContainerDefaultRh'>
      <Link to="/LoginRh" className="voltar">
          <p>Voltar</p> 
        </Link>

<h1 style={{ color: '#fff' , textAlign: 'center'}}>Área do recrutador</h1><br/>
      <p  style={{ color: '#fff' , textAlign: 'center'}}>
        Utilize o nome da empresa e a senha cadastrada <br/>para acessar sua conta.
      </p><br/>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="nome" style={{ color: '#fff'}}>Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={handleNomeChange}
            placeholder='Digite o nome de cadastro'
          />
        </div>
        <div className="formGroup">
        <label htmlFor="pass" style={{ color: '#fff' }}>Senha:</label>
          <input
            type="password" // Alterado para tipo password para ocultar a senha
            id="pass"
            value={pass} // Alterado para pegar a senha do estado
            onChange={handlePassChange} // Adicionado para atualizar o estado da senha
            placeholder='Digite a senha'
          />
        </div>
        <button className="btnMenu" type="submit">Entrar</button>
      </form>

      {loginError && (
        <p className="errorMessage">{loginError}</p>
      )}
  
      <br/>
      <Link to="/RegisterCnpj">
      <p  style={{ color: '#fff'}}>Ainda não realizou o cadastro? cadastre-se agora!</p>
      </Link>
    </div>
  );
};

export default LoginCnpj;
