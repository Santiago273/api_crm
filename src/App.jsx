import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layauts/Layout'
import Inicio from './painas/Inicio'
import NuevoCliente from './painas/NuevoCliente'
import EditarCliente from './painas/EditarCliente'
import VerCliente from './painas/VerCliente'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/clientes' element={<Layout/>}>
          <Route index element={<Inicio/>}/>
          <Route path='nuevo' element={<NuevoCliente/>}/>
          <Route path='editar/:id' element={<EditarCliente/>}/>
          <Route path=':id' element={<VerCliente/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
