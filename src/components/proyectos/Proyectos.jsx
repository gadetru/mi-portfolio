import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import './proyecto.scss'

import flechaIzquierda from '../../img/flecha-izquierda.png'
import flechaDerecha from '../../img/flecha-correcta.png'

export const Proyectos = ({ filtro = "" }) => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      try {
        setLoading(true);
        setError(null);
        const data = await fetch("/project.json");
        if (!data.ok) {
          throw new Error(`Error ${data.status} al cargar proyectos`);
        }
        const result = await data.json();
        setProjects(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div>
        <p>Cargando proyectos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error al cargar proyectos: {error}</p>
      </div>
    );
  }

  const isEmpty = filteredProjects.length === 0;
  const displayPage = isEmpty ? 0 : currentPage;

  return (
    <div>
      <div className="projectos-ppal">
        {isEmpty ? (
          <p>Sin resultados</p>
        ) : (
          filteredProjects.slice(startIndex, endIndex).map((project) => {
            return (
              <article className="projectos-card" key={project.id}>
                <div className="card-contenido">
                  <div className="card-media">
                    <img alt={project.titulo} src={project.url_imagen} />
                  </div>
                  <div className="card-body">
                    <p className="card-tag">#{project.tag}</p>
                    <h2> {project.titulo}</h2>
                    <p className="descripcion">{project.descripcion}</p>
                  </div>
                  <div className="enlaces">
                    <a className="enlace-codigo" href={project.url_despliegue} target="_blank" rel="noreferrer noopener">Web</a>
                    <a className="enlace-codigo" href={project.url_github} target="_blank" rel="noreferrer noopener">Código</a>
                  </div>
                </div>
              </article>);
          })
        )}
      </div>

      <div className="botones-paginas">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isEmpty || currentPage === 1}
        >
          <img alt="volver" src={flechaIzquierda} />

        </button>
        <span> {displayPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isEmpty || endIndex >= filteredProjects.length || currentPage === totalPages}
        >
          <img alt="siguiente" src={flechaDerecha} />
        </button>
      </div>
    </div>
  );
};

Proyectos.propTypes = {
  filtro: PropTypes.string
};
