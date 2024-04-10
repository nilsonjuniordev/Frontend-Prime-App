import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UploadImages = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [userDocs, setUserDocs] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserDocs(storedUserId); // Busca os documentos do usuário assim que o componente é montado
    }
  }, []);

  const fetchUserDocs = async () => {
    try {
      // Recuperar o userId do localStorage
      const storedUserId = localStorage.getItem('userId');
  
      if (!storedUserId) {
        console.warn('Nenhum userId encontrado no localStorage.');
        return;
      }
  
      const response = await axios.get('https://191.184.72.124:8800/');
      const users = response.data;
  
      // Encontrar o usuário com o userId correspondente
      const user = users.find(user => user.iduser === parseInt(storedUserId));
  
      // Verificar se o usuário foi encontrado
      if (user) {
        setUserDocs(user.docs.split(',')); // Convertendo a string de documentos em um array
      } else {
        console.warn('Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar os documentos do usuário:', error);
    }
  };
  
  
  

  const handleFileChange = (e) => {
    // Permitir múltiplas seleções de arquivos
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      // Converter FileList para array e anexar ao estado atual
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
      setUploadMessage("");
    }
  };

  const handleUpload = async () => {
    if (files.length === 0 || !userId) {
      setUploadMessage("Nenhum arquivo selecionado ou UserId não fornecido.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "https://191.184.72.124:8800/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            UserId: userId, // Envie o userId no cabeçalho
          },
        }
      );
      setTimeout(() =>{
        navigate('/MyAccount'); 
      }, 1000);
      console.log("Response:", response);
      setUploadMessage(
        <div className="alertGreen">
          Documento enviado com sucesso, selecione o próximo documento.
        </div>
      );
      setFiles([]); // Limpar os arquivos após o upload
    } catch (error) {
      console.error("Erro ao enviar as imagens:", error);
      setUploadMessage(
        <div className="alertRed">
          Erro ao enviar documento. Selecione um novo documento para ser
          enviado.
        </div>
      );
    }
  };

  return (
    <div>
         <br/> <h3> Documentos solicitados pelo recrutador:</h3>
     <h4 className="AlertUp">
      {userDocs.join(', ')}
        </h4>
      <div className="DocUpdate">
        <label htmlFor="fileInput" className="custom-file-upload">
          <input
            type="file"
            id="fileInput"
            multiple
            onChange={handleFileChange}
          />{" "}
          Clique aqui e selecione o documento em seu celular ou computador:
          <br />
          <br />
        </label>
        <div className="image-preview">
          {files.map((file, index) => (
            <img key={index} src={URL.createObjectURL(file)} alt="preview" />
          ))}
        </div>{" "}
        {uploadMessage && <p>{uploadMessage}</p>}
       
        <button className="EnvUpdate" onClick={handleUpload}>
          Enviar Imagens
        </button>{" "}
      </div>
    </div>
  );
};

export default UploadImages;
