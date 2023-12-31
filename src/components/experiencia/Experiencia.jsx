import React from "react";
import "./experiencia.scss";

export const Experiencia = () => {
  return (
    <div className="caja-experiencia">

      <h2>Experiencia:</h2>
      <div className="lugares">
        <h3>Nükrum Technologies</h3>
        <ul>
          <li>
            Creación del proyecto digital Nükrum basado en tratamientos médicos
            innovadores.
          </li>
          <li>Tecnologías: HTML, SASS, NodeJS, React, MySQL, Azure, Bitbucket, figma.</li>
        </ul>
      </div>
      <div className="lugares">
        <h3>AIcrop</h3>

        <ul>
          <li>
            Creación del proyecto digital de AIcrop parael control automatizado
            de invernaderos.
          </li>

          <li>
            Desarrollo y maquetación fronted Implementación de la lógica y
            peticiones del servidor.
          </li>
          <li>Gestión y diseño de la base de datos.</li>
          <li>Tecnologías: HTML, SASS, NodeJS, React, MySQL, GitHub, figma, SCRUM</li>
        </ul>
      </div>
      <div className="idiomas">
              <h2>Idiomas:</h2>
      <div>
        <h3>Castellano:</h3>
        <p>Lengua materna</p>
      </div>
      <div>
        <h3>Alemán:</h3>
        <p>Nivel B2 ,experiencia laboral en el país de 7 años.</p>
      </div>
      <div>
        <h3>Inglés:</h3>
        <p>Nivel básico.</p>
      </div>
      </div>
      <h2>Formación:</h2>

      <div className="mi-formacion">
        <h3>socraTech</h3>
        <ul>
          <li>
            Maquetación web: HTML5, CSS3, Flexbox, Grid, diseño webresponsive,
            SASS, Bootstrap.
          </li>
          <li>Front-end: JavaScript ES6, TypeScript, React.</li>
          <li>Back-end: NodeJS, Express, Bases de datos: MySQL.</li>
          <li>Manejo del sistema de control de versiones Git.</li>
          <li>Herramientas de desarrollo: VSCode, Terminal, Consola.</li>
          <li>
            Herramientas de trabajo en equipo y comunicación: GitHub,Teams,
            Discord, Slack.
          </li>
          <li>Desarrollo de proyectos utilizando metodología Agile ySCRUM.</li>
        </ul>
      </div>
    </div>
  );
};
