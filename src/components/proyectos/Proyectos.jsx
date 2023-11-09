import React, { useEffect, useState } from "react";

import './proyecto.scss'

import flechaIzquierda from '../../img/flecha-izquierda.png'
import flechaDerecha from '../../img/flecha-correcta.png'

export const Proyectos = ({ filtro }) => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 4; // Cambia esto según la cantidad de elementos por página que desees.

  
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    // Función para actualizar la cantidad de elementos por página en función del ancho de la ventana
    function updateItemsPerPage() {
      if (window.innerWidth <= 480) {
        setItemsPerPage(1);
      } else if(window.innerWidth <= 800 && window.innerWidth > 480){
        setItemsPerPage(2);
      }else if(window.innerWidth <= 1200 && window.innerWidth > 800){
        setItemsPerPage(3);

      }
      else {
        setItemsPerPage(4);
      }
    }

    // Llama a la función para establecer el valor inicial
    updateItemsPerPage();

    // Escucha cambios en el tamaño de la ventana y actualiza la cantidad de elementos por página cuando sea necesario
    window.addEventListener('resize', updateItemsPerPage);

    // Limpia el evento de escucha cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  // Filtrar proyectos en función del filtro
  const filteredProjects = filtro
    ? projects.filter((project) => project.tag.includes(filtro))
    : projects;

  // Calcular la cantidad total de páginas en función de los proyectos filtrados
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

      // Ajustar la página actual si es necesario
      useEffect(() => {
        if (totalPages < currentPage) {
            setCurrentPage(1);
        }
        }, [filtro, currentPage, totalPages]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("../../project.json");
      
      const result = await data.json();
      setProjects(result);
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="projectos-ppal">
        {filteredProjects.slice(startIndex, endIndex).map((project) => {
          return (
            <a className="projectos-card" href={project.url_despliegue} key={project.id} target="blank">
            <div  key={project.id}>
             
              <img alt={project.titulo} src={project.url_imagen}></img>
              <br></br>
              <p>#{project.tag}</p>
              <h2> {project.titulo}</h2>
              <p className="descripcion">{project.descripcion}</p>

              <div className="enlaces">
                {/* <a className="enlace-despliegue" href={project.url_despliegue} target="blank">Web </a> */}
                <a className="enlace-codigo" href={project.url_github} target="blank">Código</a>
                
              </div>
              
            </div>
            </a>);
        })
        }
      </div>

      <div className="botones-paginas">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img alt="volver" src={flechaIzquierda} />
         
        </button>
        <span> {currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= filteredProjects.length || currentPage === totalPages}
        >
          <img alt="alante" src={flechaDerecha} />
        </button>
      </div>
    </div>
  );
};
