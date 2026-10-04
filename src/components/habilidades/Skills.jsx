import { useState } from 'react'
import './skills.scss'
import reactIcon from'../../img/react.png'
import javaScripIcon from'../../img/javascript.png'
import htmlIcon from'../../img/html.png'
import cssIcon from'../../img/css.png'
import nodeIcon from'../../img/node.png'
import sassIcon from'../../img/sass.png'
import mysqlIcon from'../../img/mysql.png'
import typeScriptIcon from'../../img/typeScript.png'
import angularIcon from'../../img/angularIcon.png'
import gitIcon from'../../img/gitIcon.png'
import mongoIcon from'../../img/mongoIcon.png'
import javaIcon from'../../img/java.png'
import openCodeIcon from'../../img/opencode.png'
import csharpIcon from'../../img/csharp.png'
import dotnetIcon from'../../img/dotnet.png'
import intellijIcon from'../../img/intellij.png'
import visualStudioIcon from'../../img/visualstudio.png'
import vsCodeIcon from'../../img/vscode.png'
import androidStudioIcon from'../../img/androidstudio.png'
import sqlServerIcon from'../../img/sqlserver.png'
import xmlIcon from'../../img/xml.png'
import xamlIcon from'../../img/xaml.png'
import kotlinIcon from'../../img/kotlin.png'
import sqlIcon from'../../img/sql.png'
import plsqlIcon from'../../img/plsql.png'
import eclipseIcon from'../../img/eclipse.png'
import githubIcon from'../../img/github.png'
import ollamaIcon from'../../img/ollama.png'
import lmstudioIcon from'../../img/lmstudio.png'
import windowsIcon from'../../img/windows.png'

const CATEGORIAS = [
  {
    slug: 'lenguajes',
    titulo: 'Lenguajes',
    items: [
      { nombre: 'Java', alt: 'icono java', icon: javaIcon },
      { nombre: 'C#', alt: 'icono csharp', icon: csharpIcon },
      { nombre: 'javaScript', alt: 'icono javaScript', icon: javaScripIcon },
      { nombre: 'typeScript', alt: 'icono typeScript', icon: typeScriptIcon },
      { nombre: 'Kotlin', alt: 'icono Kotlin', icon: kotlinIcon },
      { nombre: 'SQL', alt: 'icono SQL', icon: sqlIcon },
      { nombre: 'PL/SQL', alt: 'icono PL/SQL', icon: plsqlIcon },
    ],
  },
  {
    slug: 'marcas',
    titulo: 'Marcas',
    items: [
      { nombre: 'HTML5', alt: 'icono HTML5', icon: htmlIcon },
      { nombre: 'XML', alt: 'icono XML', icon: xmlIcon },
      { nombre: 'XAML', alt: 'icono XAML', icon: xamlIcon },
      { nombre: 'CSS', alt: 'CSS', icon: cssIcon },
      { nombre: 'SASS', alt: 'icono sass', icon: sassIcon },
    ],
  },
  {
    slug: 'frameworks',
    titulo: 'Frameworks',
    items: [
      { nombre: 'React', alt: 'icono react', icon: reactIcon },
      { nombre: 'Angular', alt: 'Angular', icon: angularIcon },
      { nombre: 'Node', alt: 'icono node', icon: nodeIcon },
      { nombre: '.NET', alt: 'icono dotnet', icon: dotnetIcon },
    ],
  },
  {
    slug: 'basedatos',
    titulo: 'Bases de datos',
    items: [
      { nombre: 'MySQL', alt: 'icono mysql', icon: mysqlIcon },
      { nombre: 'MongoDB', alt: 'mongo', icon: mongoIcon },
      { nombre: 'SQL Server', alt: 'icono SQL Server', icon: sqlServerIcon },
    ],
  },
  {
    slug: 'ides',
    titulo: 'IDEs/entornos',
    items: [
      { nombre: 'IntelliJ IDEA', alt: 'icono IntelliJ IDEA', icon: intellijIcon },
      { nombre: 'Visual Studio', alt: 'icono Visual Studio', icon: visualStudioIcon },
      { nombre: 'Visual Studio Code', alt: 'icono Visual Studio Code', icon: vsCodeIcon },
      { nombre: 'Eclipse', alt: 'icono Eclipse', icon: eclipseIcon },
      { nombre: 'Android Studio', alt: 'icono Android Studio', icon: androidStudioIcon },
    ],
  },
  {
    slug: 'controlversiones',
    titulo: 'Control de versiones',
    items: [
      { nombre: 'Git', alt: 'icono git', icon: gitIcon },
      { nombre: 'GitHub', alt: 'icono GitHub', icon: githubIcon },
    ],
  },
  {
    slug: 'iaherramientas',
    titulo: 'IA y herramientas',
    items: [
      { nombre: 'OpenCode', alt: 'icono opencode', icon: openCodeIcon },
      { nombre: 'Ollama', alt: 'icono Ollama', icon: ollamaIcon },
      { nombre: 'LM Studio', alt: 'icono LM Studio', icon: lmstudioIcon },
    ],
  },
  {
    slug: 'so',
    titulo: 'Sistemas operativos',
    items: [
      { nombre: 'Windows', alt: 'icono Windows', icon: windowsIcon },
    ],
  },
]

export const Skills = () => {
  const [activa, setActiva] = useState(null)

  return (

    <div className="skill">
      <h2 className="tecnologias-titulo">Tecnologías:</h2>
      <div className="botonera" role="group" aria-label="Categorías de tecnologías">
        {CATEGORIAS.map((categoria) => {
          const abierta = activa === categoria.slug
          return (
            <button
              key={categoria.slug}
              type="button"
              className={`botonera-boton${abierta ? ' activo' : ''}`}
              aria-expanded={abierta}
              aria-controls={`panel-${categoria.slug}`}
              id={`boton-${categoria.slug}`}
              onClick={() => setActiva((prev) => (prev === categoria.slug ? null : categoria.slug))}
            >
              {categoria.titulo}
            </button>
          )
        })}
      </div>
      {CATEGORIAS.map((categoria) => (
        activa === categoria.slug ? (
          <div
            key={categoria.slug}
            className="panel-tecnologias"
            id={`panel-${categoria.slug}`}
            role="region"
            aria-labelledby={`boton-${categoria.slug}`}
          >
            <h3 className="categoria-titulo">{categoria.titulo}</h3>
            <div className="tecnologias">
              {categoria.items.map((item) => (
                <div key={item.nombre}>
                  {item.icon ? <img alt={item.alt} src={item.icon} /> : null}
                  <p>{item.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null
      ))}

    </div>

  )
}
