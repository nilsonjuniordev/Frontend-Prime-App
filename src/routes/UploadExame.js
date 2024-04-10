import GlobalStyle from "../styles/global";
import UploadAso from "../components/UploadAso";
import SideBarUser from "../components/SideBarUser";
import NavBar from "../components/NavBar";
const UploadExame = () => (
<>
  <SideBarUser />

      <div className="ContainerApp70">
      <NavBar />

        <div className="ContentApp">
      <br />
      <h2>
        Tire fotos nítidas de seu examo realizado, garanta que todas as informações estejam legiveis.<br />
     
      </h2>

      <UploadAso />
    </div></div>

    <GlobalStyle />
  </>
);

export default UploadExame;
