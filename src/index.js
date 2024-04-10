import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {createBrowserRouter, RouterProvider, Routes, Navigate,} from "react-router-dom";
import App from "./routes/App.js";
import Login from "./routes/Login.js";
import Home from "./routes/Home.js";
import Listar from "./routes/Listar.js";
import ListarAdm from "./routes/ListarAdm.js";
import MyData from "./routes/MyData.js";
import MyDataRh from "./routes/MyDataRh.js";
import Register from "./routes/Register.js";
import MyAccount from "./routes/MyAccount.js";
import MyDataAdm from "./routes/MyDataAdm.js";
import Upload from "./routes/Upload.js";
import LoginAdm from "./routes/LoginAdm.js";
import LoginCnpj from "./routes/LoginCnpj.js";
import LoginUser from "./routes/LoginUser.js";
import AdminRh from "./routes/AdminRh.js";
import Admin from "./routes/Admin.js";
import RegisterRh from "./routes/RegisterRh.js";
import RegisterAdm from "./routes/RegisterAdm.js";
import RegisterAdmRh from "./routes/RegisterAdmRh.js";
import RegisterCnpj from "./routes/RegisterCnpj.js";
import LoginRh from "./routes/LoginRh"
import UploadExame from "./routes/UploadExame"
import MyDocs from "./routes/MyDocs"

// Definição do componente PrivateRouteWrapper
const PrivateRouteWrapper = ({ element, isAuthenticated }) => {
  console.log("PrivateRouteWrapper - isAuthenticated:", isAuthenticated);
  return isAuthenticated ? <>{element}</> : <Navigate to="/" replace />;
};

const AppContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [hasSpecificToken, setHasSpecificToken] = useState(
    !!localStorage.getItem("specificToken")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authenticated = !!token;
    const specificToken = localStorage.getItem("specificToken");
    const hasToken = !!specificToken;

    setTimeout(() => {
      setIsAuthenticated(authenticated);
      setHasSpecificToken(hasToken);
    }, 0);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        // Rotas Publicas
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "LoginUser",
          element: <LoginUser />,
        },
        {
          path: "LoginAdm",
          element: <LoginAdm />,
        },
        {
          path: "LoginCnpj",
          element: <LoginCnpj />,
        },
        {
          path: "LoginRh",
          element: <LoginRh />,
        },       

        {
          path: "RegisterCnpj",
          element: <RegisterCnpj />,
        },
        {
          path: "Register",
          element: <Register />,
        },
      
        // Rotas Privadas EMPRESAS
        {
          path: "Listar",
          element: hasSpecificToken ? <Listar /> : <Navigate to="/" replace />,
        },
        {
          path: "ListarAdm",
          element: hasSpecificToken ? <ListarAdm /> : <Navigate to="/" replace />,
        },
        {
          path: "AdminRh",
          element: hasSpecificToken ? <AdminRh />: <Navigate to="/" replace />,
        },
        {
          path: "Admin",
          element: hasSpecificToken ? <Admin />: <Navigate to="/" replace />,
        },
        {
          path: "MyDataRh",
          element: hasSpecificToken ? <MyDataRh /> : <Navigate to="/" replace />,
        },
        {
          path: "MyDataAdm",
          element: hasSpecificToken ? <MyDataAdm /> : <Navigate to="/" replace />,
        },
        {
          path: "RegisterRh",
          element: hasSpecificToken ? <RegisterRh /> : <Navigate to="/" replace />,
        },

        {
          path: "RegisterAdmRh",
          element: hasSpecificToken ? <RegisterAdmRh /> : <Navigate to="/" replace />,
        },
      
        {
          path: "RegisterAdm",
          element: hasSpecificToken ? <RegisterAdm /> : <Navigate to="/" replace />,
        },
       

 // Rotas Privadas COLABORADORES
        {
          path: "MyData",
          element: (
            <PrivateRouteWrapper
              element={<MyData />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },

        {
          path: "MyDocs",
          element: (
            <PrivateRouteWrapper
              element={<MyDocs />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },
       
        {
          path: "MyAccount",
          element: (
            <PrivateRouteWrapper
              element={<MyAccount />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },
     
    
        {
          path: "Upload",
          element: (
            <PrivateRouteWrapper
              element={<Upload />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },

        {
          path: "UploadExame",
          element: (
            <PrivateRouteWrapper
              element={<UploadExame />}
              isAuthenticated={isAuthenticated}
            />
          ),
        },
       
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router}>
        <Routes>{router}</Routes>
      </RouterProvider>
    </React.StrictMode>
  );
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppContainer />);
