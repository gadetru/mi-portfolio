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
  const capaAtrasRef = useRef(null)
  const capaFrenteRef = useRef(null)
  const hojas = useMemo(crearHojas, [])

  // Sorteo frontal estable por montaje: 2-3 en desktop, 1-2 en móvil <=720px.
  // Puro por montaje (deps []), cambia solo por recarga.
  const idsFrente = useMemo(() => {
    const esMovil = typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(max-width: 720px)').matches
    const cuantos = esMovil
      ? 1 + Math.floor(Math.random() * 2)
      : 2 + Math.floor(Math.random() * 2)
    const indices = Array.from({ length: NUM_HOJAS }, (_, i) => i)
    for (let i = indices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const aux = indices[i]
      indices[i] = indices[j]
      indices[j] = aux
    }
    return new Set(indices.slice(0, cuantos).map((i) => `hoja-${i}`))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const capaAtras = capaAtrasRef.current
    const capaFrente = capaFrenteRef.current
    if (!capaAtras && !capaFrente) {
      return undefined
    }

    let rafId = 0
    let mouseX = 0
    let mouseY = 0
    let pendiente = false

    const aplicarRepelencia = () => {
      pendiente = false
      const capas = [capaAtras, capaFrente].filter(Boolean)
      for (let c = 0; c < capas.length; c += 1) {
        const figuras = capas[c].querySelectorAll('.hoja-figura')
        for (let i = 0; i < figuras.length; i += 1) {
          const figura = figuras[i]
          const hoja = figura.closest('.hoja')
          if (!hoja) {
            continue
          }
          const rect = figura.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = cx - mouseX
          const dy = cy - mouseY
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && dist < RADIO_REPELENCIA) {
            const fuerza = (1 - dist / RADIO_REPELENCIA) * FUERZA_MAX
            const norma = fuerza / dist
            hoja.style.setProperty('--mx', `${(dx * norma).toFixed(1)}px`)
            hoja.style.setProperty('--my', `${(dy * norma).toFixed(1)}px`)
          } else {
            hoja.style.setProperty('--mx', '0px')
            hoja.style.setProperty('--my', '0px')
          }
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

  const hojasAtras = hojas.filter((hoja) => !idsFrente.has(hoja.id))
  const hojasFrente = hojas.filter((hoja) => idsFrente.has(hoja.id))

  const pintarHoja = (hoja, esFrontal) => {
    const tam = esFrontal ? hoja.tam * 1.18 : hoja.tam
    const opacidad = esFrontal ? Math.min(1, Math.max(0.9, hoja.opacidad)) : hoja.opacidad
    return (
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
              '--tam': `${tam}px`,
              '--color': hoja.color,
              '--dur-giro': `${hoja.durGiro}s`,
              '--ret-giro': `${hoja.retGiro}s`,
              '--opacidad': opacidad
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='hojas-capa-atras' ref={capaAtrasRef} aria-hidden='true'>
        {hojasAtras.map((hoja) => pintarHoja(hoja, false))}
      </div>
      <div className='hojas-capa-frente' ref={capaFrenteRef} aria-hidden='true'>
        {hojasFrente.map((hoja) => pintarHoja(hoja, true))}
      </div>
    </>
  )
}
