import React,{useState} from 'react'
import './filtrado.scss'

export const Filtrado = ({onFilterChange}) => {

 const [filtro, setFiltro] = useState('');

 const handleFiltroChange = (tag)=>{
    setFiltro(tag);
    onFilterChange(tag);

 };

  return (
    <div className='botonera-filtro'>
      <button className={filtro === 'vanilla'? 'activa' : ''} onClick={() => handleFiltroChange("vanilla")}>Vanilla</button>
      <button className={filtro === 'React'? 'activa' : ''} onClick={() => handleFiltroChange("React")}>React</button>
      <button className={filtro === 'JS'? 'activa' : ''} onClick={() => handleFiltroChange("JS")}>JavaScript</button>
      <button className={filtro === ''? 'activa' : ''} onClick={() => handleFiltroChange("")}>Todo</button>
      {/* Agrega botones adicionales según tus tags */}
    </div>
  )
}
