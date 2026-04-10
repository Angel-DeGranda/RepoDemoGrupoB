import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MiComponente from './componentes/MiComponente.jsx'
import Tarjeta from './componentes/Tarjeta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tarjeta 
      imagen="FollowFindYou" 
      nombre="Follow - Find You" 
      año="Octubre de 2019" 
      texto="Este es un albun lanzado el cual cuenta con 6 canciones."
    />
    <Tarjeta 
      imagen="OneOfAKind" 
      nombre="One Of A Kind" 
      año="Junio de 2021" 
      texto="Este es un albun lanzado el cual cuenta con 6 canciones."
    />
    <Tarjeta 
      imagen="Unfold" 
      nombre="Unfold" 
      año="abril de 2026" 
      texto="Este es un albun lanzado el cual cuenta con 10 canciones."
    />
  </StrictMode>,
)
