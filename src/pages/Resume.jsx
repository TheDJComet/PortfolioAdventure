import { useState } from 'react'
import NESBox from '../components/NESBox.jsx'

const STATS = [
  { name:'FRONTEND',    val:92, color:'#d89000' },
  { name:'BACKEND',     val:80, color:'#6888f8' },
  { name:'PROBLEM SOL', val:95, color:'#50b878' },
  { name:'ARCHITECTURE',val:85, color:'#d82800' },
  { name:'DEBUGGING',   val:88, color:'#c8a46a' },
  { name:'TEAMWORK',    val:90, color:'#50b878' },
]

const SKILLS = {
  'WEAPONS (LANGUAGES)': ['JavaScript','TypeScript','Python','SQL','HTML','CSS','Swift','C#'],
  'SPELLS (FRAMEWORKS)': ['React','Node.js','Next.js','Vite','Tailwind'],
  'RELICS  (TOOLS)':     ['Git','Docker','AWS','Figma','PostgreSQL','Unity','Godot','Aseprite'],
}

const QUESTS = [
  {
    title:'Frontend Developer - Internship',
    org:'Neofortunity',
    period:'2026-Present',
    desc:'Helped develop the frontend for the Neofortunity company as a project',
    tags:['XCode','Firebase','MacOS','Swift'],
  },
  {
    title:'Real Time Network Traffic Analyzer',
    org:'Personal Project',
    period:'2026',
    desc:'Created a simple real time traffic analyzing tool in python using scapy, pandas, and matplotlib. Traffic is sniffed then graphed in real time from the first packet received.',
    tags:['Python','Scapy','Pandas','Matplotlib','Newtork Analysis'],
  },
  {
    title:'Sales Representative',
    org:'Under Armour - Tannersville Outlet',
    period:'2020 - Present',
    desc:'Completed 12 client side quests. Defended capstone: a real-time collaborative dungeon map with WebSockets and canvas.',
    tags:['Teamwork','Money-Handling'],
  },
]

function StatBar({ stat }) {
  return (
    <div style={{ marginBottom:'12px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
        <span style={{ fontSize:'6px', color:'#c8a46a' }}>{stat.name}</span>
        <span style={{ fontSize:'6px', color: stat.color }}>{stat.val}</span>
      </div>
      <div style={{ height:'8px', background:'#181818', border:'1px solid #2a1200', position:'relative' }}>
        <div style={{
          width:`${stat.val}%`, height:'100%',
          background: stat.color,
          boxShadow:`0 0 6px ${stat.color}`,
          imageRendering:'pixelated',
        }}/>
      </div>
    </div>
  )
}

function QuestEntry({ quest, i }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderLeft:`3px solid #6b3a00`,
      paddingLeft:'14px', marginBottom:'16px',
      position:'relative',
      animation:`pageIn 0.4s ease ${i*0.09}s both`,
    }}>
      <div style={{ position:'absolute', left:'-6px', top:'3px', width:'8px', height:'8px', background:'#d89000' }}/>
      <div style={{ cursor:'pointer' }} onClick={() => setOpen(o => !o)}>
        <div style={{ fontSize:'7px', color:'#f8d800', marginBottom:'3px' }}>{quest.title}</div>
        <div style={{ fontSize:'6px', color:'#525252', marginBottom:'2px' }}>{quest.org}  ·  {quest.period}</div>
        <div style={{ fontSize:'6px', color:'#6b3a00' }}>{open ? '▲ COLLAPSE' : '▼ EXPAND'}</div>
      </div>
      {open && (
        <div style={{ marginTop:'8px', animation:'pageIn 0.25s ease' }}>
          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'1rem', color:'#c8a46a', lineHeight:1.65, marginBottom:'8px' }}>
            {quest.desc}
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
            {quest.tags.map(t => (
              <span key={t} style={{ fontSize:'6px', color:'#d89000', border:'1px solid #6b3a00', padding:'3px 7px', background:'#181818' }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Resume() {
  return (
    <div className="page-enter" style={{
      minHeight:'100vh', paddingTop:'70px', paddingBottom:'50px',
      position:'relative', zIndex:1,
      fontFamily:"'Press Start 2P', monospace",
    }}>
      <div style={{ maxWidth:'760px', margin:'0 auto', padding:'0 16px' }}>
        {/* Title */}
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontSize:'clamp(10px,3vw,16px)', color:'#f8d800', marginBottom:'10px' }}>SKILLS &amp; ATTRIBUTES</div>
          <div style={{ fontSize:'6px', color:'#525252', letterSpacing:'0.1em' }}>═══════════════════════════</div>
          <div style={{ fontSize:'6px', color:'#c8a46a', marginTop:'6px' }}>■ CHARACTER STAT SHEET ■</div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'16px', marginBottom:'16px' }}>
          {/* Stats */}
          <NESBox title="CORE ATTRIBUTES">
            {STATS.map(s => <StatBar key={s.name} stat={s} />)}
          </NESBox>

          {/* Skills */}
          <NESBox title="SKILL GRIMOIRE">
            {Object.entries(SKILLS).map(([school, skills]) => (
              <div key={school} style={{ marginBottom:'14px' }}>
                <div style={{ fontSize:'6px', color:'#d89000', marginBottom:'8px' }}>■ {school}</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                  {skills.map(s => (
                    <span key={s} style={{
                      fontSize:'6px', color:'#c8a46a',
                      border:'1px solid #6b3a00', padding:'3px 7px',
                      background:'#0d0d0d',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </NESBox>
        </div>

        {/* Quest history */}
        <NESBox title="QUEST HISTORY" style={{ marginBottom:'20px' }}>
          {QUESTS.map((q, i) => <QuestEntry key={q.title} quest={q} i={i} />)}
        </NESBox>

        {/* Download */}
        <div style={{ textAlign:'center' }}>
          <a href="#" style={{
            display:'inline-block',
            fontFamily:"'Press Start 2P',monospace", fontSize:'7px',
            color:'#000', textDecoration:'none',
            background:'#d89000',
            border:'4px solid #c8a46a',
            boxShadow:'inset 0 0 0 2px #000, inset 0 0 0 4px #c8a46a, 4px 4px 0 #6b3a00',
            padding:'10px 20px',
            cursor:'pointer',
            transition:'transform 0.1s, box-shadow 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translate(2px,2px)'; e.currentTarget.style.boxShadow='inset 0 0 0 2px #000, inset 0 0 0 4px #c8a46a, 2px 2px 0 #6b3a00' }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='inset 0 0 0 2px #000, inset 0 0 0 4px #c8a46a, 4px 4px 0 #6b3a00' }}
          >
            ■ DOWNLOAD SCROLL (PDF)
          </a>
        </div>
      </div>
    </div>
  )
}