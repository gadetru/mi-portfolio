import React from 'react'
import './hobbies.scss'
import bici from '../../img/bici2.png'
import monte from '../../img/montaña.jpg'

export const Hobbies = () => {
  return (
    <div className='hobbies'>

        <h2> Mis Hobbies:</h2>
        <div className='hobbies-card'>
            <div>
              <img alt='bicicleta' src={bici}/>
              <h3> Biking </h3>
              <p>Rutas en modo trail y enduro por bosques y montañas</p>
            </div>
            <div>
              <img alt='montaña' src={monte}/>
              <h3> Hiking </h3>
              <p>Caminar por senderos y acampar al aire libre</p>
            </div>
        </div>

    </div>
  )
}
