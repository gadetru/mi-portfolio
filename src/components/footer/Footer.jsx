import React from 'react'
import './footer.scss'
import gitCat from '../../img/gitcat.png'
import linked from '../../img/linkedin.png'
export const Footer = () => {
  return (
<footer className="footer">
  <h2>Creado por: Gabriel Delgado Trujillo</h2>
    <div className="social-links">
      <a href="https://www.linkedin.com/in/gadetru" target="_blank">
        <img src={linked} alt="LinkedIn" />
      </a>
      <a href="https://github.com/gadetru" target="_blank">
        <img src={gitCat} alt="GitHub" />
      </a>
    </div>
  
</footer>
  )
}
