import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PortafolioProvider } from './context/PortafolioProvider'
import Layout from './layouts/Layout'
import Experiencia from './paginas/Experiencia'
import Habilidades from './paginas/Habilidades'
import Home from './paginas/Home'
import Proyectos from './paginas/Proyectos'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <PortafolioProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='habilidades' element={<Habilidades />} />
              <Route path='experiencia' element={<Experiencia />} />
              <Route path='proyectos' element={<Proyectos />} />
            </Route>
          </Routes>
        </PortafolioProvider>
      </I18nextProvider>
    </BrowserRouter>
  )
}

export default App
