import { useNavigate, useLocation } from 'react-router-dom'

const NAV = [
  { path:'/',        label:'TAVERN'  },
  { path:'/about',   label:'LORE'    },
  { path:'/resume',  label:'STATS'   },
  { path:'/contact', label:'GUILD'   },
]

const s = {
  nav: {
    position:'fixed', top:0, left:0, right:0, zIndex:100,
    background:'#000',
    borderBottom:'4px solid #c8a46a',
    display:'flex', alignItems:'center',
    padding:'0 12px',
    boxShadow:'0 4px 0 #6b3a00',
    fontFamily:"'Press Start 2P', monospace",
  },
}

export default function Nav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <nav style={s.nav}>
      <div style={{ color:'#f8d800', fontSize:'10px', padding:'12px 12px 12px 0' }}>⚔</div>
      <div style={{ display:'flex', flex:1 }}>
        {NAV.map(({ path, label }) => {
          const active = pathname === path
          return (
            <button key={path} onClick={() => navigate(path)} style={{
              background: active ? '#2a1200' : 'transparent',
              border:'none',
              color: active ? '#f8d800' : '#c8a46a',
              fontFamily:"'Press Start 2P', monospace",
              fontSize:'7px',
              padding:'13px 14px',
              cursor:'pointer',
              borderBottom: active ? '3px solid #d89000' : '3px solid transparent',
              transition:'color 0.15s',
            }}>
              {active && '▶ '}{label}
            </button>
          )
        })}
      </div>
      <div style={{ fontSize:'10px', color:'#d89000', animation:'blink 1s step-end infinite' }}>█</div>
    </nav>
  )
}