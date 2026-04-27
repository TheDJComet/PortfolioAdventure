import { useState, useEffect } from 'react'
import NESBox from '../components/NESBox.jsx'

const TRAITS = [
  { label:'CLASS',      value:'Full-Stack Sorcerer'     },
  { label:'RACE',       value:'Human (Caffeinated)'     },
  { label:'ALIGN',      value:'Chaotic Creative'        },
  { label:'ORIGIN',     value:'The Digital Frontier'    },
  { label:'DEITY',      value:'Open Source Gods'        },
  { label:'LANG',       value:'JS/C#/PY/SQL/HTML'            },
]

const LORE = [
  `Inspired by the works of studios like Bungie, I wanted to develop my own games and work for a game studio. From there sparked a love for Computer Science, taking that momentum I learned not only systems and tools for game development, but also furthered my development knowledge.`,
  `I have used various languages like C/C++ and C#, Python, JavaScript, and more. C# for my independent game projects in Unity, Python for job agent that uses RapidAPI's JobSearch API and Claude API to search for jobs then score them against a given resume and generating a cover letter with a link to the job. Or JS to develop a site like this using a tech stack of Vite and React. `,
  `I seek opportunities to craft experiences that feel like magic — where the interface disappears and the adventure begins. Whether for ten users or ten million, every quest gets the same fervor.`,
]

export default function About() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 80) }, [])

  return (
    <div className="page-enter" style={{
      minHeight:'100vh', paddingTop:'70px', paddingBottom:'50px',
      position:'relative', zIndex:1,
      fontFamily:"'Press Start 2P', monospace",
    }}>
      <div style={{ maxWidth:'700px', margin:'0 auto', padding:'0 16px' }}>

        {/* Title */}
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontSize:'clamp(10px,3vw,16px)', color:'#f8d800', marginBottom:'10px' }}>
            THE ADVENTURER'S CODEX
          </div>
          <div style={{ fontSize:'6px', color:'#525252', letterSpacing:'0.1em' }}>
            ═══════════════════════════
          </div>
          <div style={{ fontSize:'6px', color:'#c8a46a', marginTop:'6px' }}>
            ■ CHARACTER PROFILE &amp; LORE ■
          </div>
        </div>

        {/* Portrait + Traits row */}
        <div style={{ display:'flex', gap:'16px', marginBottom:'20px', flexWrap:'wrap' }}>

          {/* Portrait */}
          <NESBox title="PORTRAIT" style={{ width:'160px', flexShrink:0, alignSelf:'flex-start' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
              {/* Sprite slot: swap this svg with <img src="/hero.png"> */}
              <div style={{
                width:'96px', height:'96px',
                background:'#0d0d0d',
                border:'2px solid #6b3a00',
                display:'flex', alignItems:'center', justifyContent:'center',
                position:'relative', overflow:'hidden',
              }}>
                <svg width="64" height="80" viewBox="0 0 16 20" style={{ imageRendering:'pixelated' }}>
                  <rect x="3" y="0" width="10" height="3" fill="#2a1200"/>
                  <rect x="4" y="2" width="8" height="6" fill="#c8956a"/>
                  <rect x="5" y="4" width="2" height="2" fill="#000"/>
                  <rect x="9" y="4" width="2" height="2" fill="#000"/>
                  <rect x="6" y="7" width="4" height="1" fill="#a06050"/>
                  <rect x="5" y="8" width="6" height="2" fill="#c8956a"/>
                  <rect x="2" y="10" width="12" height="8" fill="#6b3a00"/>
                  <rect x="4" y="10" width="8" height="7" fill="#2a1200"/>
                  <rect x="3" y="16" width="10" height="2" fill="#c8a46a"/>
                  <rect x="4" y="18" width="3" height="2" fill="#181818"/>
                  <rect x="9" y="18" width="3" height="2" fill="#181818"/>
                </svg>
                {/* XP bar */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  height:'4px', background:'#181818',
                }}>
                  <div style={{ width:'72%', height:'100%', background:'#007800' }}/>
                </div>
              </div>
              <div style={{ fontSize:'6px', color:'#f8d800', textAlign:'center' }}>ADVENTURER</div>
              <div style={{ fontSize:'6px', color:'#525252' }}>LVL MAX</div>
              <div style={{ width:'100%', height:'1px', background:'#2a1200' }}/>
              <div style={{ fontSize:'5px', color:'#50b878', textAlign:'center', lineHeight:1.8 }}>
                HP ████████<br/>
                MP ██████░░
              </div>
            </div>
          </NESBox>

          {/* Traits */}
          <NESBox title="CHARACTER TRAITS" style={{ flex:1, minWidth:'200px' }}>
            {TRAITS.map(t => (
              <div key={t.label} style={{
                display:'flex', justifyContent:'space-between',
                padding:'7px 0', borderBottom:'1px solid #181818',
                alignItems:'baseline', gap:'8px',
              }}>
                <span style={{ fontSize:'6px', color:'#525252', flexShrink:0 }}>{t.label}</span>
                <span style={{ fontSize:'6px', color:'#c8a46a', textAlign:'right' }}>{t.value}</span>
              </div>
            ))}
          </NESBox>
        </div>

        {/* Lore */}
        <NESBox title="LORE &amp; HISTORY" style={{ marginBottom:'16px' }}>
          {LORE.map((p, i) => (
            <p key={i} style={{
              fontFamily:"'Crimson Text', serif",
              fontSize:'1.05rem',
              lineHeight:1.75,
              color:'#c8a46a',
              marginBottom: i < LORE.length - 1 ? '16px' : 0,
              textIndent:'1.5em',
              opacity: show ? 1 : 0,
              transform: show ? 'none' : 'translateY(6px)',
              transition: `opacity 0.5s ease ${i*0.12}s, transform 0.5s ease ${i*0.12}s`,
            }}>{p}</p>
          ))}
        </NESBox>

        <div style={{ textAlign:'center', fontSize:'6px', color:'#525252' }}>
          "NOT ALL WHO WANDER ARE LOST  --  SOME ARE JUST BETWEEN GIT BRANCHES."
        </div>
      </div>
    </div>
  )
}