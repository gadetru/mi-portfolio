import React from 'react'
import './perfil.scss'
import perfil2 from'../../img/yomismo.webp'
import perfil1 from'../../img/mi-perfil.webp'
import telefono from'../../img/telefono-movil.svg'
import correo from'../../img/correo-electronico.svg'

export const Perfil = () => {
  return (
    <div className='perfil '>

        <img src={perfil1} alt='micareto'/>

        <div className='contenido-personal'>
            <div className='contenedor'>
                <div className='nombre-oficio'>
                    <h2> Gabriel Delgado Trujillo </h2>
                    <h3> Full Stack developer</h3>                
                </div>
                
                <div className='contacto-personal'>
                    <div> 
                       <img className='icons' src={correo} alt='correo'/> 
                       
                       <a href="mailto:gadetru@gmail.com"> gadetru@gmail.com</a>             
                    </div>
                    <div> 
                        <img className='icons'src={telefono} alt='telefonito'/> 
                        
                        <a href="tel:+34644172604">+34644172604
                        </a>             
                    </div>                   
                </div>   
                
            </div>
            <p>Soy un joven apasionado por la programación, en constante búsqueda de conocimiento como desarrollador full stack. Mi cartera refleja mi dedicación para crear soluciones tecnológicas innovadoras y eficientes mientras sigo aprendiendo y creciendo en este emocionante campo.</p> 
        </div>




    </div>
  )
}
