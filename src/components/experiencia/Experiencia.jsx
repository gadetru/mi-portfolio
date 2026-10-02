import { useEffect, useState } from "react";
import "./experiencia.scss";

export const Experiencia = () => {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetch("/experiencia.json");
        if (!data.ok) {
          throw new Error(`Error ${data.status} al cargar experiencia`);
        }
        const result = await data.json();
        if (!ignore) {
          setDatos(result);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="caja-experiencia">
        <p>Cargando experiencia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="caja-experiencia">
        <p>Error al cargar experiencia: {error}</p>
      </div>
    );
  }

  const empleos = datos?.empleos ?? [];
  const formacion = datos?.formacion ?? [];
  const idiomas = datos?.idiomas ?? [];

  return (
    <div className="caja-experiencia">
      <h2>Experiencia en empresas:</h2>
      {empleos.map((empleo) => (
        <div className="lugares" key={empleo.empresa}>
          <h3>{empleo.empresa}</h3>
          <ul>
            <li>
              {empleo.rol} — {empleo.ubicacion} ({empleo.periodo})
            </li>
            {empleo.logros.map((logro) => (
              <li key={logro}>{logro}</li>
            ))}
          </ul>
        </div>
      ))}
      <h2>Formación:</h2>
      {formacion.map((curso) => (
        <div className="mi-formacion" key={`${curso.centro}-${curso.titulo}`}>
          <h3>{curso.centro}</h3>
          <ul>
            <li>
              {curso.titulo}
              {curso.periodo ? ` (${curso.periodo})` : ""}
              {curso.ubicacion ? ` — ${curso.ubicacion}` : ""}
            </li>
            {curso.detalle ? <li>{curso.detalle}</li> : null}
          </ul>
        </div>
      ))}
      <div className="idiomas">
        <h2>Idiomas:</h2>
        {idiomas.map((idioma) => (
          <div key={idioma.lengua}>
            <h3>{idioma.lengua}:</h3>
            <p>{idioma.nivel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
