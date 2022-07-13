import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alunos from "./routes/alunos";
import Turmas from "./routes/turmas";
import Matriculas from "./routes/matriculas";
import Inicio from "./routes/inicio";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Inicio />} />
        <Route path="alunos" element={<Alunos />} />
        <Route path="turmas" element={<Turmas />} />
        <Route path="matriculas" element={<Matriculas />} />
      </Route>
    </Routes>
  </BrowserRouter>
);