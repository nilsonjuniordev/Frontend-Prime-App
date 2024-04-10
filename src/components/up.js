import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadDocuments = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [noDocumentSelected, setNoDocumentSelected] = useState(true);

  useEffect(() => {
    // Carregue o userId do Local Storage ao montar o componente
    const storedUserId = localStorage.getItem('userId');
    console.log('Stored UserId:', storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      console.log('File selected:', selectedFile);
      setFile(selectedFile);
      setSelectedFileName(selectedFile.name);
      setNoDocumentSelected(false); // Documento selecionado, altera o estado
      setUploadMessage(null);
    } else {
      setFile(null);
      setSelectedFileName("");
      setNoDocumentSelected(true); // Nenhum documento selecionado, altera o estado
    }
  };
  
  const handleUpload = async () => {
    try {
      if (!userId) {
        console.error('UserId não fornecido.');
        return;
      }
      console.log('UserId enviado:', userId);
      console.log('Estado do arquivo antes da requisição:', file);
  
      const formData = new FormData();
      formData.append('files', file);
      formData.append('userId', userId);
  
      console.log('UserId enviado:', userId);
      console.log('FormData antes da requisição:', formData);
  
      // Adicione a linha abaixo para ver o conteúdo completo do FormData
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
  
      const response = await axios.post('https://191.184.72.124:8800/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'UserId': userId, // Envie o userId no cabeçalho
        },
      });
  
      console.log('Response:', response);
  
      console.log('Arquivo enviado com sucesso');
      setUploadMessage(<div className='alertGreen'>Documento enviado com sucesso, selecione o próximo documento.</div>);
      setFile(null);
    } catch (error) {
      console.error('Erro ao enviar o documento:', error.response);
      setUploadMessage(<div className='alertRed'>Selecione um novo documento para ser enviado.</div>);
    }
  };
  
  return (
    <div>    
      <div className='DocUpdate'>
      <label htmlFor="fileInput" className="custom-file-upload">
        <input type="file" id="fileInput" onChange={handleFileChange} />
        Selecione o documento em seu celular ou computador:<br/><br/>
        {noDocumentSelected ? "Nenhum documento selecionado" : `Documento selecionado: ${selectedFileName}`}
      </label>

      <button className='EnvUpdate' onClick={handleUpload}>Enviar Arquivo</button>
    </div>
      {uploadMessage && <p>{uploadMessage}</p>}

      
    </div>
  );
};

export default UploadDocuments;
