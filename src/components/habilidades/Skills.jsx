import React from 'react'
import './skills.scss'
import reactIcon from'../../img/react.png'
import javaScripIcon from'../../img/javascript.png'
import htmlIcon from'../../img/html.png'
import cssIcon from'../../img/css.png'
import nodeIcon from'../../img/node.png'
import sassIcon from'../../img/sass.png'
import mysqlIcon from'../../img/mysql.png'

export const Skills = () => {
  return (

    <div className="skill">
      <h2>Tecnologías:</h2>
      <div className='tecnologias'>
        <div> 
            <img alt='icono react' src={reactIcon}/> 
            <p>React</p>
        </div>
        <div> 
            <img alt='icono javaScript' src={javaScripIcon}/> 
            <p>javaScript</p>
        </div>
        <div> 
            <img alt='icono HTML' src={htmlIcon}/> 
            <p>HTML</p>
        </div>
        <div> 
            <img alt='CSS' src={cssIcon}/> 
            <p>CSS</p>
        </div>
        <div> 
            <img alt='icono sass' src={sassIcon}/> 
            <p>SASS</p>
        </div>
        <div> 
            <img alt='icono node' src={nodeIcon}/> 
            <p>Node</p>
        </div>
        <div> 
            <img alt='icono mysql' src={mysqlIcon}/> 
            <p>MySQL</p>
        </div>
      </div>

    </div>

  )
}
