import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import SideBarUser from "../components/SideBarUser";
import NavBar from "../components/NavBar";

const MyAccount = () => {
  const [uploadsPath, setUploadsPath] = useState(null);
  const [userName, setUserName] = useState("");
  const [cadastroIncompleto, setCadastroIncompleto] = useState(false);
  const [processoConcluido, setProcessoConcluido] = useState(false); // Adicionando estado para indicar se o processo está concluído

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  
    //API para obter os dados do usuário
    fetch(`https://191.184.72.124:8800/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados do usuário:", data); // Adicione este log para verificar os dados do usuário
  
        const userUploadsPath = data.uploadsPath;
        const name = data.nome;
  
        setUploadsPath(userUploadsPath);
        setUserName(name);
  
        // Verifica se algum campo obrigatório está faltando
        if (!data.rg || !data.cep || !data.rua || !data.numero) {
          console.log("Cadastro incompleto"); // Adicione este log para verificar se o cadastro está incompleto
          setCadastroIncompleto(true);
        }
  
        // Verifica se o campo uploadsPathAso está definido para marcar o processo como concluído
        if (data.uploadsPathAso) {
          console.log("Processo concluído"); // Adicione este log para verificar se o processo está concluído
          setProcessoConcluido(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter dados do usuário:", error);
      });
  }, []);
  

// Função para exibir a mensagem correspondente ao estado do cadastro
const getStatusMessage = () => {
  if (cadastroIncompleto) { // Verifica se o cadastro está incompleto primeiro
    return (
      <div className="StepsUser">
        <div className="StepsContent1">
          <h2>Passo 1:</h2>
          <p>
            Por favor, complete seu cadastro. Acesse a opção "Meu cadastro" para
            completar as informações necessárias.
          </p>
        </div>
        <img src="/assets/step-3.png" alt='' />
      </div>
    );
  } else if (!uploadsPath) {
    return (
      <div className="StepsUser">
        <div className="StepsContent2"> 
          <h2>Passo 2:</h2>                
          <p>
            Obrigado por completar seu cadastro! Por favor, envie os documentos solicitados em
            'Enviar Documentos'.
          </p>
        </div>
        <img src="/assets/step-3.png" alt='' />
      </div>
    );
  } else if (!processoConcluido) {
    return (
      <div className="StepsUser">
        <div className="StepsContent3">  
          <h2>Passo 3:</h2>         
          <p>
            Vamos validar os documentos e marcar seu exame em breve, para
            finalizar o processo, assim que tiver com exame em mãos por favor
            envie clicando no botão 'Enviar Exame(ASO)'.
          </p>
        </div>
        <img src="/assets/step-3.png" alt='' />
      </div>
    );
  } else {
    return (
      <div className="StepsUser">
        <div className="StepsContent4">
          <h2>Processo Concluído</h2>
          <p>
            Parabéns, seu processo foi concluído com sucesso!
          </p>
        </div> 
        <img src="/assets/step-3.png" alt='' />
      </div>
    );
  }
};

  return (
    <>
      <SideBarUser />
      <div className="ContainerApp70">
        <NavBar />
        <div className="ContentApp">
          <p>Bem vindo, {userName || "visitante"}!</p>
          <br />
          <p>{getStatusMessage()}</p><br/>
          <p>Sigas as instruções Acima para realizar seu exame e finalizar seu processo.</p><br/>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
