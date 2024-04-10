import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

const UploadAso = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

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
        "https://191.184.72.124:8800/uploads/aso",
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
      }, 800);
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
      {" "}
      <div className="DocUpdate">
        <label htmlFor="fileInput" className="custom-file-upload">
          <input
            type="file"
            id="fileInput"
            multiple
            onChange={handleFileChange}
          />   Clique aqui e selecione o documento em seu celular ou computador:
          <br />
          <br />
        </label>
        <div className="image-preview">
          {files.map((file, index) => (
            <img key={index} src={URL.createObjectURL(file)} alt="preview" />
          ))}
        </div>
        {uploadMessage && <p>{uploadMessage}</p>}
     
        <button className="EnvUpdate" onClick={handleUpload}>
          Enviar Imagens
        </button>
      </div>
    </div>
  );
};

export default UploadAso;