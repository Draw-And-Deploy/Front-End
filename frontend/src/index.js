import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login"
import TelaProjetos from "./pages/ListagemProjetos/ListarProjetos"
import reportWebVitals from "./reportWebVitals";
import CriarRecurso from "./pages/CadastroServicos/criarRecursos";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/meus_projetos" element={<TelaProjetos />}/>
        <Route path="/criar_recursos" element={<CriarRecurso />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();