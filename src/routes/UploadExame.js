
import UploadAso from "../components/UploadAso";
import SideBarUser from "../components/SideBarUser";

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

const UploadExame = () => {

  const theme = useTheme();

return(

<>
<SideBarUser /> 
      <Box
        component="main"
        sx={{
          marginTop: 10, // Margem para o AppBar
          [theme.breakpoints.down('sm')]: {
            marginTop: 4, // Reduz a margem para dispositivos móveis
          },
        }}
      >   
    

      <UploadAso />
      </Box>
   
  </>
);
};

export default UploadExame;
