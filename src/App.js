import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/layout/Navigation";
import Home from "./components/views/Home/Home.js";
import Footer from "./components/layout/Footer";
import Paciente from "./components/views/paciente/Paciente"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <main>
          <Routes>
            <Route exact path="/" element={ <Home /> }/>
            <Route exact path="/paciente" element={ <Paciente /> }/>
          </Routes>

        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
