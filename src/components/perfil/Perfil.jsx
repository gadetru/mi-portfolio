import React from 'react'
import './perfil.scss'
import perfil1 from'../../img/perfil1.jpg'
import perfil2 from'../../img/yomismo.webp'
import telefono from'../../img/telefono-movil.svg'
import correo from'../../img/correo-electronico.svg'

export const Perfil = () => {
  return (
    <div className='perfil '>

        <img src={perfil2} alt='micareto'/>

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
            <p>Soy un joven apasionado por el mundo de la programación y estoy comprometido en convertirme en un desarrollador full stack. Mi entusiasmo por aprender y explorar nuevas tecnologías me impulsa a crecer constantemente en este campo. A través de mi determinación y dedicación, he adquirido habilidades tanto en el desarrollo frontend como en el backend, lo que me permite abordar proyectos de manera integral. Mi objetivo es crear soluciones tecnológicas innovadoras y eficientes, y mi portfolio refleja mi compromiso con la excelencia y el continuo aprendizaje. ¡Estoy emocionado por lo que el futuro tiene reservado en mi carrera como desarrollador full stack y estoy listo para enfrentar nuevos desafíos con pasión y creatividad</p> 
        </div>




    </div>
  )
}
