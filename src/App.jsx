import { useState } from 'react'
import './app.scss'
import { Perfil } from './components/perfil/Perfil'
import { Skills } from './components/habilidades/Skills'
import { Hobbies } from './components/entretenimiento/Hobbies'
import { Proyectos } from './components/proyectos/Proyectos'
import { Experiencia } from './components/experiencia/Experiencia'
import { Filtrado } from './components/filtro/Filtrado'
import { Footer } from './components/footer/Footer'



function App() {
  const [count, setCount] = useState(0)
  const [filtro, setFiltro] = useState(""); // Nuevo estado para el filtro

  return (
    <>

      
      <div className='grid-container-1'>
        <div className='box1 grid-item'><Perfil/></div>
        <div className='box2'><Skills/></div>
        <div className='box3'> <Hobbies/> </div>
        <div className='box4'> <Experiencia/> </div>
        <div className='box5'> <Filtrado onFilterChange={setFiltro}/> </div>
        <div className='box6'><Proyectos filtro={filtro}/></div>
        <div className='box7'><Footer/></div>
      </div>
      
      
  
    </>
  )
}

export default App
