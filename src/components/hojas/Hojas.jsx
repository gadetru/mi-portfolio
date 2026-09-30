import { useEffect, useMemo, useRef } from 'react'
import './hojas.scss'

const NUM_HOJAS = 14
const RADIO_REPELENCIA = 120
const FUERZA_MAX = 60

const COLORES_OTONO = [
  '#d35400',
  '#e67e22',
  '#c0392b',
  '#a65a00',
  '#8b5a2b',
  '#b9770e',
  '#935116',
  '#7e5109'
]

const aleatorio = (min, max) => min + Math.random() * (max - min)

const crearHojas = () =>
  Array.from({ length: NUM_HOJAS }, (_, i) => ({
    id: `hoja-${i}`,
    x: aleatorio(2, 98),
    tam: aleatorio(14, 28),
    color: COLORES_OTONO[i % COLORES_OTONO.length],
    durCaida: aleatorio(9, 16),
    retCaida: aleatorio(-16, 0),
    durGiro: aleatorio(2.5, 5),
    retGiro: aleatorio(-5, 0),
    deriva: aleatorio(30, 80),
    opacidad: aleatorio(0.7, 0.95)
  }))

export const Hojas = () => {
  const capaRef = useRef(null)
  const hojas = useMemo(crearHojas, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const capa = capaRef.current
    if (!capa) {
      return undefined
    }

    let rafId = 0
    let mouseX = 0
    let mouseY = 0
    let pendiente = false

    const aplicarRepelencia = () => {
      pendiente = false
      const nodos = capa.children
      for (let i = 0; i < nodos.length; i += 1) {
        const nodo = nodos[i]
        const rect = nodo.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - mouseX
        const dy = cy - mouseY
        const dist = Math.hypot(dx, dy)
        if (dist > 0 && dist < RADIO_REPELENCIA) {
          const fuerza = (1 - dist / RADIO_REPELENCIA) * FUERZA_MAX
          const norma = fuerza / dist
          nodo.style.setProperty('--mx', `${(dx * norma).toFixed(1)}px`)
          nodo.style.setProperty('--my', `${(dy * norma).toFixed(1)}px`)
        } else {
          nodo.style.setProperty('--mx', '0px')
          nodo.style.setProperty('--my', '0px')
        }
      }
    }

    const onMouseMove = (evento) => {
      mouseX = evento.clientX
      mouseY = evento.clientY
      if (!pendiente) {
        pendiente = true
        rafId = window.requestAnimationFrame(aplicarRepelencia)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className='hojas-capa' ref={capaRef} aria-hidden='true'>
      {hojas.map((hoja) => (
        <div
          key={hoja.id}
          className='hoja'
          style={{
            '--x': `${hoja.x}%`,
            '--mx': '0px',
            '--my': '0px'
          }}
        >
          <div
            className='hoja-caida'
            style={{
              '--dur-caida': `${hoja.durCaida}s`,
              '--ret-caida': `${hoja.retCaida}s`,
              '--deriva': `${hoja.deriva}px`
            }}
          >
            <div
              className='hoja-figura'
              style={{
                '--tam': `${hoja.tam}px`,
                '--color': hoja.color,
                '--dur-giro': `${hoja.durGiro}s`,
                '--ret-giro': `${hoja.retGiro}s`,
                '--opacidad': hoja.opacidad
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
