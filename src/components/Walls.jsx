import React, { useEffect, useRef } from 'react'
import './Walls.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const base = import.meta.env.BASE_URL;

const WALLS = [
  { name: 'Maria', desc: 'The outermost wall. The first line of defense, breached in year 845.', radius: '480 km', img: `${base}images/wall_maria.png` },
  { name: 'Rose', desc: 'The middle wall. A crucial stronghold for humanity\'s survival.', radius: '380 km', img: `${base}images/wall_rose.png` },
  { name: 'Sina', desc: 'The innermost wall. Protecting the king and the elite.', radius: '250 km', img: `${base}images/wall_sina.png` }
]

export default function Walls() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const contentRef = useRef(null)
  const wallItemsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    // Fade in text
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, duration: 1, 
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'center center',
          scrub: true
        }
      }
    )

    // Stagger wall stats
    wallItemsRef.current.forEach((el, i) => {
      gsap.fromTo(el, 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section className="walls" id="walls" ref={sectionRef}>
      <div className="walls__bg" ref={bgRef}>
        <img src={`${base}images/wall.png`} alt="The Walls" />
        <div className="walls__bg-overlay" />
      </div>

      <div className="walls__content" ref={contentRef}>
        <div className="walls__header">
          <h2>The Three <span>Walls</span></h2>
          <p className="walls__sub">A fragile cage for the remnants of humanity.</p>
        </div>

        <div className="walls__grid">
          {WALLS.map((wall, i) => (
            <div 
              key={wall.name} 
              className="walls__item"
              ref={el => wallItemsRef.current[i] = el}
            >
              <div className="walls__item-visual">
                <img src={wall.img} alt={`Wall ${wall.name}`} />
              </div>
              <div className="walls__item-text">
                <h3>Wall {wall.name}</h3>
                <span className="walls__item-radius">Radius: {wall.radius}</span>
                <p>{wall.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
