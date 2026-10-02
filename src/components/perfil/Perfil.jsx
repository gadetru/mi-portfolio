import './perfil.scss'
import perfil1 from'../../img/mi-perfil.webp'
import telefono from'../../img/telefono-movil.svg'
import correo from'../../img/correo-electronico.svg'

export const Perfil = () => {
  return (
    <div className='perfil'>

        <div className='foto-perfil'>
            <img className=' yomismo' src={perfil1} alt='micareto'/>
        </div>

        <div className='contenido-personal'>
            <div className='contenedor'>
                <div className='nombre-oficio'>
                    <h2> Gabriel Delgado Trujillo </h2>
                    <h3> Full Stack developer</h3>                
                </div>
                
                <div className='contacto-personal'>

                    <div className='transicion-contacto'> 
                    
                       <img className='icons' src={correo} alt='correo'/> 
                       
                       <a href="mailto:gadetru@gmail.com"> gadetru@gmail.com</a>             
                    </div>
                    <div className='transicion-contacto'> 
                        <img className='icons'src={telefono} alt='telefonito'/> 
                        
                        <a href="tel:+34644172604">+34644172604
                        </a>             
                    </div>                   
                </div>   
                
            </div>
            <p>Desarrollador de Software con experiencia desde 2023, especializado en FrontEnd y maquetación con JavaScript, HTML y CSS. Formado como Desarrollador de Aplicaciones Multiplataforma, con experiencia en Backend, bases de datos y aplicaciones .NET con C#. He participado en proyectos reales para clientes europeos, combinando desarrollo web, móvil y de escritorio.</p> 
        </div>




    </div>
  )
}
