import { useState } from "react";
import React from "react";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme, IconButton, Toolbar, AppBar, Typography, Hidden } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import BadgeIcon from '@mui/icons-material/Badge';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import HelpIcon from "@mui/icons-material/Help";
import WorkIcon from '@mui/icons-material/Work';
import "../styles/styles.css"; // Suponha que você tenha estilos customizados

const SideBarRh = ({ toggleTheme }) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


      const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const navigate = useNavigate();
    
    const handleLogout = () => {
      localStorage.removeItem("specificToken");
      localStorage.removeItem("userId");
      navigate("/LoginCnpj");
     
    };
  
    const handleMyData = () => {
         navigate("/MydataRh");
     
    };
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMyData}>Meu cadastro</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <HelpIcon />
          </IconButton>
          <p>Suporte</p>
        </MenuItem>
  
        <MenuItem onClick={toggleTheme}>
          <IconButton color="inherit">
            <Brightness4Icon />
           
          </IconButton>
          <p>Modo escuro</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Minha conta</p>
        </MenuItem>
      </Menu>
    );



    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label={isOpen ? "hide menu" : "show menu"}
                        onClick={toggleMenu}
                        edge="start"
                    >
                        {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                    <Link to="/AdminRh">
                            <img className='navLogo' src="/assets/iboard-logo-sfundo.png" alt='' />
                        </Link>

                        <Box sx={{ flexGrow: 2 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <HelpIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleTheme} 
            >
              <Brightness4Icon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>


                </Toolbar>
            </AppBar>
            {renderMobileMenu}
      {renderMenu}
        
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                sx={{
                    width: 290,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box width={theme.spacing(36)} sx={{ backgroundColor: theme.palette.sidebar?.main }} height="100%" display="flex" flexDirection="column">
                    <Box sx={{ backgroundColor: theme.palette.logo?.main, height: 64 }}>
                        <Link to="/AdminRh">
                            <img className='navLogo' src="/assets/iboard-logo-sfundo.png" alt='' />
                        </Link>
                    </Box>

                    <Divider />

                    <Box>
                        <List component="nav">
                            <Hidden mdUp>
                                <ListItemButton to="/AdminRh" onClick={toggleMenu}>
                                    <ListItemIcon>
                                        <ListAltIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Processo do exame" />
                                </ListItemButton>
                            </Hidden>
                            <Hidden smDown>
                                <ListItemButton to="/AdminRh">
                                    <ListItemIcon>
                                        <SsidChartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="DashBoard e relatórios" />
                                </ListItemButton>
                            </Hidden>

                            <ListItemButton to="/RegisterRH">
                                <ListItemIcon>
                                    <HowToRegIcon />
                                </ListItemIcon>
                                <ListItemText primary="Adicionar Colaborador" />
                            </ListItemButton>

                            <ListItemButton to="/Listar">
                                <ListItemIcon>
                                    <MedicalInformationIcon />
                                </ListItemIcon>
                                <ListItemText primary="Visualizar Processos" />
                            </ListItemButton>

                         
                            <Divider textAlign="left"><Typography>Serviços</Typography></Divider>

                            <ListItemButton to="">
                                <ListItemIcon>
                                    <EngineeringIcon />
                                </ListItemIcon>
                                <ListItemText primary="Uniformes e EPI" />
                            </ListItemButton>

                            <ListItemButton to="">
                                <ListItemIcon>
                                    <FavoriteIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pesquisas de clima" />
                            </ListItemButton>

                            <ListItemButton to="">
                                <ListItemIcon>
                                    <BadgeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Encontre um profissional" />
                            </ListItemButton>

                            <ListItemButton to="">
                                <ListItemIcon>
                                    <WorkIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cadastre uma vaga" />
                            </ListItemButton>
                        </List>
                    </Box>

                </Box>
            </Drawer>
        </>
    );
};

export default SideBarRh;
