import "./App.css";
import Topbar from "./components/layout-elements/Topbar";
import Footer from "./components/layout-elements/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
