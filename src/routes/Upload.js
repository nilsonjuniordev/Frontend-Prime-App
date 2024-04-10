import GlobalStyle from "../styles/global";
import UploadDocuments from "../components/UploadDocuments";
import SideBarUser from "../components/SideBarUser";
import NavBar from "../components/NavBar";
const Upload = () => (
  <>
  <SideBarUser />


      <div className="ContainerApp70">
      <NavBar />

        <div className="ContentApp">
      <br />
      <h2>
        Tire fotos nítidas, tanto da frente quanto do verso, de cada um dos
        documentos solicitados e certifique-se de anexar todos eles.
        <br />
     
      </h2>

      <UploadDocuments />
    </div> </div>

    <GlobalStyle />
  </>
);

export default Upload;
