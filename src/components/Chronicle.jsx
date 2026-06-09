import React, { useEffect, useRef } from 'react'
import './Chronicle.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  { year: '845', title: 'Fall of Shiganshina', desc: 'The Colossal and Armored Titans breach Wall Maria, forcing humanity to retreat to Wall Rose.' },
  { year: '847', title: '104th Training Corps', desc: 'Eren, Mikasa, and Armin enlist in the military to fight the Titans.' },
  { year: '850', title: 'Battle of Trost District', desc: 'The Colossal Titan reappears. Eren discovers his ability to transform into a Titan.' },
  { year: '850', title: 'Female Titan Arc', desc: 'The Survey Corps embarks on the 57th Expedition, encountering an intelligent Female Titan.' },
  { year: '854', title: 'Marley Arc', desc: 'The war escalates beyond the island, revealing the true nature of the world.' }
]

export default function Chronicle() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(lineRef.current, 
      { height: 0 },
      { 
        height: '100%', 
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom bottom',
          scrub: true
        }
      }
    )

    itemRefs.current.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section className="chronicle" id="chronicle" ref={sectionRef}>
      <div className="chronicle__header">
        <h2>The <span>Chronicle</span></h2>
        <p>A timeline of tragedy and triumph.</p>
      </div>

      <div className="chronicle__timeline">
        <div className="chronicle__line-bg" />
        <div className="chronicle__line-fill" ref={lineRef} />

        {EVENTS.map((evt, i) => (
          <div 
            key={i} 
            className={`chronicle__item ${i % 2 === 0 ? 'left' : 'right'}`}
            ref={el => itemRefs.current[i] = el}
          >
            <div className="chronicle__dot" />
            <div className="chronicle__content">
              <span className="chronicle__year">Year {evt.year}</span>
              <h3>{evt.title}</h3>
              <p>{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
