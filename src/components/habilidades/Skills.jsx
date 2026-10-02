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
    slug: 'ides',
    titulo: 'IDEs/entornos',
    items: [
      { nombre: 'IntelliJ', alt: 'icono IntelliJ', icon: intellijIcon },
      { nombre: 'Visual Studio', alt: 'icono Visual Studio', icon: visualStudioIcon },
      { nombre: 'VS Code', alt: 'icono VS Code', icon: vsCodeIcon },
      { nombre: 'Android Studio', alt: 'icono Android Studio', icon: androidStudioIcon },
      { nombre: 'OpenCode', alt: 'icono opencode', icon: openCodeIcon },
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
    slug: 'resto',
    titulo: 'Resto',
    items: [
      { nombre: 'React', alt: 'icono react', icon: reactIcon },
      { nombre: 'Angular', alt: 'Angular', icon: angularIcon },
      { nombre: 'Node', alt: 'icono node', icon: nodeIcon },
      { nombre: 'MongoDB', alt: 'mongo', icon: mongoIcon },
      { nombre: 'MySQL', alt: 'icono mysql', icon: mysqlIcon },
      { nombre: 'SQL Server', alt: 'icono SQL Server', icon: sqlServerIcon },
      { nombre: 'Git Hub', alt: 'github', icon: gitIcon },
      { nombre: '.NET', alt: 'icono dotnet', icon: dotnetIcon },
    ],
  },
]

export const Skills = () => {
  const [abiertas, setAbiertas] = useState(() => {
    const expandida = typeof window === 'undefined' || window.innerWidth > 720
    return { lenguajes: expandida, ides: expandida, marcas: expandida, resto: expandida }
  })

  const alternar = (slug) => {
    setAbiertas((prev) => ({ ...prev, [slug]: !prev[slug] }))
  }

  return (

    <div className="skill">
      <h2>Tecnologías:</h2>
      {CATEGORIAS.map((categoria) => (
        <section key={categoria.slug} className="categoria">
          <button
            type="button"
            className="categoria-cabecera"
            aria-expanded={abiertas[categoria.slug]}
            aria-controls={`categoria-${categoria.slug}`}
            onClick={() => alternar(categoria.slug)}
          >
            <span>{categoria.titulo}</span>
            <span className="categoria-signo" aria-hidden="true">{abiertas[categoria.slug] ? '−' : '+'}</span>
          </button>
          {abiertas[categoria.slug] && (
            <div className="tecnologias" id={`categoria-${categoria.slug}`}>
              {categoria.items.map((item) => (
                <div key={item.nombre}>
                  <img alt={item.alt} src={item.icon} />
                  <p>{item.nombre}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

    </div>

  )
}
