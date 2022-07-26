import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortafolioProvider } from "./context/PortafolioProvider";
import Layout from "./layouts/layout";
import Experiencia from "./paginas/Experiencia";
import Habilidades from "./paginas/Habilidades";
import Home from "./paginas/Home";
import Proyectos from "./paginas/Proyectos";


function App() {
  return (
    <BrowserRouter>
      <PortafolioProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="habilidades" element={<Habilidades />} />
            <Route path="experiencia" element={<Experiencia />} />
            <Route path="proyectos" element={<Proyectos />} />
          </Route>
        </Routes>
      </PortafolioProvider>
    </BrowserRouter>
  );
}

export default App;
