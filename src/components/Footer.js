import React from 'react';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="ContainerFooter">
   
      <p>&copy; Prime TXT {currentYear} - Todos os direitos reservados</p>
  
    </div>
  );
}

export default Footer;
