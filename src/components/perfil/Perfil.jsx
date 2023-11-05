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
            <p>Aquí estamos creando un perfil llamativo pa que me contrate alguien, ya tu sabe Aquí estamos creando un perfil llamativo pa que me contrate alguien, ya tu sabe Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minima minus accusamus laborum quod similique. Explicabo doloribus hic doloremque magni, eum ipsum veritatis repellat delectus, obcaecati voluptatibus excepturi ea soluta.</p> 
        </div>




    </div>
  )
}
