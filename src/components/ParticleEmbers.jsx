import { useEffect, useRef } from 'react'

export default function ParticleEmbers() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const items = []
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div')
      const sz = Math.random() > 0.5 ? 2 : 4
      el.style.cssText = `
        position:fixed;
        width:${sz}px;height:${sz}px;
        background:${Math.random() > 0.6 ? '#f8d800' : '#d89000'};
        pointer-events:none;z-index:2;opacity:0;
        image-rendering:pixelated;
      `
      c.appendChild(el)
      items.push(el)
      launch(el)
    }
    function launch(el) {
      const x = Math.random() * window.innerWidth
      const drift = (Math.random() - 0.5) * 80
      const dur = 4000 + Math.random() * 5000
      setTimeout(() => {
        el.animate([
          { transform:`translate(${x}px,${window.innerHeight + 4}px)`, opacity:0 },
          { transform:`translate(${x + drift * 0.4}px,${window.innerHeight * 0.5}px)`, opacity:0.85 },
          { transform:`translate(${x + drift}px,-4px)`, opacity:0 },
        ], { duration:dur, easing:'linear', fill:'forwards' }).onfinish = () => launch(el)
      }, Math.random() * 4000)
    }
    return () => items.forEach(e => e.remove())
  }, [])
  return <div ref={ref} style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:2 }} />
}