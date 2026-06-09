import React, { useEffect, useRef } from 'react'
import './Soldiers.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const base = import.meta.env.BASE_URL;

const SOLDIERS = [
  { id: 1, name: 'Eren Yeager', role: 'Attack Titan', desc: 'Driven by an insatiable desire for freedom.', img: `${base}images/eren.png` },
  { id: 2, name: 'Mikasa Ackerman', role: 'Top Soldier', desc: 'A lethal force of nature, bound by loyalty.', img: `${base}images/mikasa.png` },
  { id: 3, name: 'Levi Ackerman', role: 'Captain', desc: 'Humanity\'s strongest soldier, unmatched in combat.', img: `${base}images/levi.png` },
  { id: 4, name: 'Armin Arlert', role: 'Strategist', desc: 'A brilliant mind that sees beyond the walls.', img: `${base}images/armin.png` }
]

export default function Soldiers() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    if (!section || !wrapper) return

    const getScrollAmount = () => {
      let wrapperWidth = wrapper.scrollWidth
      return -(wrapperWidth - window.innerWidth)
    }

    const tween = gsap.to(wrapper, {
      x: getScrollAmount,
      ease: 'none'
    })

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true
    })

    gsap.fromTo(imgRef.current, 
      { filter: 'grayscale(100%) blur(10px)', scale: 1.1 },
      { 
        filter: 'grayscale(30%) blur(0px)', scale: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section className="soldiers" id="soldiers" ref={sectionRef}>
      <div className="soldiers__bg">
        <img src={`${base}images/soldier.png`} alt="Survey Corps" ref={imgRef} />
        <div className="soldiers__overlay" />
      </div>
      
      <div className="soldiers__wrapper" ref={wrapperRef}>
        <div className="soldiers__header panel">
          <p className="soldiers__eyebrow">Wings of Freedom</p>
          <h2>The Survey<br/><span>Corps</span></h2>
        </div>

        {SOLDIERS.map((s) => (
          <div key={s.id} className="soldiers__card">
            <div className="soldiers__card-visual">
              <img src={s.img} alt={s.name} />
            </div>
            <div className="soldiers__card-inner">
              <span className="soldiers__card-num">0{s.id}</span>
              <h3>{s.name}</h3>
              <p className="soldiers__card-role">{s.role}</p>
              <div className="soldiers__rule" />
              <p className="soldiers__card-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
