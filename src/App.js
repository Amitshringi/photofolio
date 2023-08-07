// components imports
import { Navbar} from "./components/Navbar";
import { AlbumsList} from "./components/AlbumList"

// react toasts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div>
        <AlbumsList />
      </div>
    </div>
  );
}

export default App;
