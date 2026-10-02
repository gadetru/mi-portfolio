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

const CATEGORIAS = [
  {
    slug: 'lenguajes',
    titulo: 'Lenguajes',
    items: [
      { nombre: 'javaScript', alt: 'icono javaScript', icon: javaScripIcon },
      { nombre: 'typeScript', alt: 'icono typeScript', icon: typeScriptIcon },
      { nombre: 'Java', alt: 'icono java', icon: javaIcon },
      { nombre: 'C#', alt: 'icono csharp', icon: csharpIcon },
    ],
  },
  {
    slug: 'marcas',
    titulo: 'Marcas',
    items: [
      { nombre: 'HTML', alt: 'icono HTML', icon: htmlIcon },
      { nombre: 'CSS', alt: 'CSS', icon: cssIcon },
      { nombre: 'SASS', alt: 'icono sass', icon: sassIcon },
      { nombre: 'XML', alt: 'icono XML', icon: xmlIcon },
      { nombre: 'XAML', alt: 'icono XAML', icon: xamlIcon },
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
      { nombre: 'MongoDB', alt: 'mongo', icon: mongoIcon },
      { nombre: 'MySQL', alt: 'icono mysql', icon: mysqlIcon },
      { nombre: 'SQL Server', alt: 'icono SQL Server', icon: sqlServerIcon },
    ],
  },
  {
    slug: 'ides',
    titulo: 'IDEs/entornos',
    items: [
      { nombre: 'IntelliJ', alt: 'icono IntelliJ', icon: intellijIcon },
      { nombre: 'Visual Studio', alt: 'icono Visual Studio', icon: visualStudioIcon },
      { nombre: 'VS Code', alt: 'icono VS Code', icon: vsCodeIcon },
      { nombre: 'Android Studio', alt: 'icono Android Studio', icon: androidStudioIcon },
      { nombre: 'OpenCode', alt: 'icono opencode', icon: openCodeIcon },
      { nombre: 'Git Hub', alt: 'github', icon: gitIcon },
    ],
  },
]

export const Skills = () => {
  const [abierta, setAbierta] = useState(() => (
    typeof window === 'undefined' ? true : window.innerWidth > 720
  ))

  return (

    <div className="skill">
      <button
        type="button"
        className="tecnologias-toggle"
        aria-expanded={abierta}
        aria-controls="tecnologias-contenido"
        onClick={() => setAbierta((v) => !v)}
      >
        <span>Tecnologías:</span>
        <span className="tecnologias-signo" aria-hidden="true">{abierta ? '−' : '+'}</span>
      </button>
      <div className={`desplegable${abierta ? ' abierto' : ''}`} id="tecnologias-contenido">
        <div className="desplegable-interno">
          {CATEGORIAS.map((categoria) => (
            <section key={categoria.slug} className="categoria">
              <h3 className="categoria-titulo">{categoria.titulo}</h3>
              <div className="tecnologias">
                {categoria.items.map((item) => (
                  <div key={item.nombre}>
                    <img alt={item.alt} src={item.icon} />
                    <p>{item.nombre}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

    </div>

  )
}
