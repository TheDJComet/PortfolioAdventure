import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MENU_OPTIONS = [
  { id: 'about', label: '📜  Tell me your tale, stranger.', sub: '— Hear the adventurer\'s lore', path: '/about' },
  { id: 'resume', label: '⚔️  Show me your skills.', sub: '— View the skill & stat sheet', path: '/resume' },
  { id: 'contact', label: '🏰  Join the guild.', sub: '— Send word to the Guild Hall', path: '/contact' },
]

// Inline pixel hero SVG (placeholder — swap with your Aseprite sprite)
function PixelHero({ onClick, talking }) {
  return (
    <svg
      width="80" height="120"
      viewBox="0 0 20 30"
      style={{
        imageRendering: 'pixelated',
        cursor: 'pointer',
        filter: talking ? 'drop-shadow(0 0 8px #f0a020) drop-shadow(0 0 16px #f0a020)' : 'drop-shadow(0 0 4px #f0a020)',
        animation: 'float 3s ease-in-out infinite',
        transition: 'filter 0.3s',
      }}
      onClick={onClick}
    >
      {/* Cloak */}
      <rect x="3" y="14" width="14" height="14" fill="#3a1a0a"/>
      <rect x="2" y="15" width="2" height="12" fill="#2a1208"/>
      <rect x="16" y="15" width="2" height="12" fill="#2a1208"/>
      {/* Body */}
      <rect x="6" y="12" width="8" height="10" fill="#5a2e14"/>
      {/* Belt */}
      <rect x="5" y="19" width="10" height="2" fill="#8b6914"/>
      <rect x="9" y="19" width="2" height="2" fill="#d4aa20"/>
      {/* Arms */}
      <rect x="3" y="13" width="3" height="7" fill="#5a2e14"/>
      <rect x="14" y="13" width="3" height="7" fill="#5a2e14"/>
      {/* Hands */}
      <rect x="3" y="20" width="3" height="3" fill="#c8956a"/>
      <rect x="14" y="20" width="3" height="3" fill="#c8956a"/>
      {/* Sword */}
      <rect x="17" y="8" width="1" height="16" fill="#c0c0d0"/>
      <rect x="16" y="12" width="3" height="1" fill="#d4aa20"/>
      <rect x="17" y="21" width="1" height="3" fill="#8b6914"/>
      {/* Neck */}
      <rect x="8" y="10" width="4" height="3" fill="#c8956a"/>
      {/* Head */}
      <rect x="6" y="4" width="8" height="7" fill="#c8956a"/>
      {/* Hair */}
      <rect x="6" y="4" width="8" height="2" fill="#1a0a00"/>
      <rect x="6" y="6" width="2" height="2" fill="#1a0a00"/>
      <rect x="12" y="6" width="2" height="2" fill="#1a0a00"/>
      {/* Eyes */}
      <rect x="8" y="7" width="1" height="1" fill="#1a0a00"/>
      <rect x="11" y="7" width="1" height="1" fill="#1a0a00"/>
      {/* Eye shine */}
      <rect x="8" y="7" width="1" height="1" fill="#88aaff" opacity="0.6"/>
      {/* Mouth */}
      {talking ? (
        <rect x="9" y="9" width="2" height="1" fill="#5a0000"/>
      ) : (
        <rect x="9" y="9" width="2" height="1" fill="#a06050"/>
      )}
      {/* Hood */}
      <rect x="5" y="2" width="10" height="4" fill="#2a0e06"/>
      <rect x="4" y="3" width="12" height="3" fill="#3a1a0a"/>
      <rect x="4" y="5" width="12" height="2" fill="#2a0e06"/>
      {/* Boots */}
      <rect x="6" y="26" width="4" height="4" fill="#1a0a00"/>
      <rect x="10" y="26" width="4" height="4" fill="#1a0a00"/>
      {/* Candle glow particles handled by ParticleEmbers */}
    </svg>
  )
}

function TavernBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* Stone floor */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 60px), linear-gradient(180deg, #2a1e10 0%, #1a1208 100%)',
      }}/>
      {/* Wall */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: '35%',
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 50px), linear-gradient(180deg, #0d0a07 0%, #1a1208 100%)',
      }}/>
      {/* Candles left */}
      <Candle style={{ position: 'absolute', left: '8%', bottom: '42%' }} />
      {/* Candles right */}
      <Candle style={{ position: 'absolute', right: '8%', bottom: '42%' }} />
      {/* Ambient glow center */}
      <div style={{
        position: 'absolute', bottom: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(212,136,10,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>
      {/* Top vignette */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%)',
      }}/>
      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
      }}/>
      {/* Hanging sign */}
      <div style={{
        position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{ width: '2px', height: '40px', background: '#5a3a1a', margin: '0 auto' }}/>
        <div style={{
          background: 'linear-gradient(135deg, #3a2208, #1a1008)',
          border: '3px solid #7a5c1e',
          padding: '10px 30px',
          borderRadius: '4px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#d4aa20', lineHeight: 1 }}>
            The Wandering Coder
          </div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.15em', marginTop: '4px' }}>
            ADVENTURE TO BE HAD - PORTFOLIOS TO BE READ
          </div>
        </div>
      </div>
    </div>
  )
}

function Candle({ style }) {
  return (
    <div style={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: '6px', height: '24px',
        background: 'linear-gradient(180deg, #e8d5a3, #c4a86a)',
        borderRadius: '1px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
          width: '8px', height: '14px',
          background: 'radial-gradient(ellipse at 50% 80%, #fff5a0, #f0a020, #cc4400)',
          borderRadius: '50% 50% 20% 20%',
          animation: 'flicker 1.5s ease-in-out infinite',
          boxShadow: '0 0 10px #f0a020, 0 0 30px rgba(240,160,32,0.4)',
        }}/>
        <div style={{
          position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
          width: '60px', height: '60px',
          background: 'radial-gradient(circle, rgba(240,160,32,0.15), transparent)',
          borderRadius: '50%',
        }}/>
      </div>
      <div style={{ width: '12px', height: '6px', background: '#5a3a1a', borderRadius: '2px' }}/>
    </div>
  )
}

function DialogBox({ lines, shown, done }) {
  return (
    <div style={{
      position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
      marginBottom: '12px', width: '320px',
      background: 'linear-gradient(135deg, rgba(20,12,4,0.97), rgba(30,18,6,0.97))',
      border: '2px solid var(--border-gold)',
      borderRadius: '6px',
      padding: '14px 18px',
      boxShadow: '0 0 30px rgba(0,0,0,0.9), 0 0 15px rgba(212,136,10,0.2)',
      opacity: shown ? 1 : 0,
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      {/* Corner decorations */}
      {['tl','tr','bl','br'].map(c => (
        <div key={c} style={{
          position: 'absolute',
          top: c.startsWith('t') ? '4px' : 'auto', bottom: c.startsWith('b') ? '4px' : 'auto',
          left: c.endsWith('l') ? '4px' : 'auto', right: c.endsWith('r') ? '4px' : 'auto',
          width: '8px', height: '8px',
          background: 'var(--gold)',
          clipPath: 'polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)',
          transform: c === 'tr' ? 'rotate(90deg)' : c === 'br' ? 'rotate(180deg)' : c === 'bl' ? 'rotate(270deg)' : '',
        }}/>
      ))}
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.5, fontStyle: 'italic' }}>
        {lines}
      </div>
      {done && <div style={{ textAlign: 'right', marginTop: '6px', fontFamily: 'var(--font-title)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', animation: 'flicker 1.2s infinite' }}>▼ CLICK</div>}
      {/* Triangle */}
      <div style={{
        position: 'absolute', bottom: '-9px', left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
        borderTop: '8px solid var(--border-gold)',
      }}/>
    </div>
  )
}

const DIALOG_SEQUENCE = [
  "Ah, a visitor enters the Wandering Coder...",
  "I've been expecting someone like you, traveler.",
  "What brings you to my corner of the realm?",
]

export default function Tavern() {
  const navigate = useNavigate()
  const [dialogIdx, setDialogIdx] = useState(-1)
  const [showMenu, setShowMenu] = useState(false)
  const [talking, setTalking] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 200)
    return () => clearTimeout(t)
  }, [])

  const handleHeroClick = () => {
    if (showMenu) return
    if (dialogIdx < DIALOG_SEQUENCE.length - 1) {
      setDialogIdx(d => d + 1)
      setTalking(true)
      setTimeout(() => setTalking(false), 600)
    } else {
      setDialogIdx(-1)
      setShowMenu(true)
    }
  }

  const handleOptionSelect = (opt) => {
    setSelectedOption(opt.id)
    setTimeout(() => navigate(opt.path), 400)
  }

  return (
    <div style={{
      minHeight: '100vh', position: 'relative', zIndex: 1,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
      paddingBottom: '12vh',
      opacity: intro ? 0 : 1, transition: 'opacity 0.8s ease',
    }}>
      <TavernBackground />

      {/* Table */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 'min(600px, 90vw)', height: '60px',
        background: 'linear-gradient(180deg, #5a3a1a 0%, #3a2208 60%, #2a1208 100%)',
        borderRadius: '8px 8px 0 0',
        boxShadow: '0 -4px 30px rgba(0,0,0,0.6)',
        border: '1px solid #7a5c1e',
        zIndex: 2,
      }}>
        {/* Table grain */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '8px 8px 0 0',
          background: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.05) 30px, rgba(0,0,0,0.05) 31px)',
        }}/>
        {/* Ale mug left */}
        <div style={{ position: 'absolute', left: '15%', top: '-20px' }}>
          <div style={{ width: '20px', height: '28px', background: 'linear-gradient(180deg, #c8956a, #a07040)', borderRadius: '2px 2px 4px 4px', border: '1px solid #7a5030', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '24px', height: '10px', background: 'rgba(240,230,180,0.3)', borderRadius: '50%', boxShadow: '0 0 8px rgba(240,230,180,0.5)' }}/>
          </div>
        </div>
        {/* Scroll right */}
        <div style={{ position: 'absolute', right: '15%', top: '-12px', width: '40px', height: '20px', background: 'var(--parchment-light)', borderRadius: '10px', transform: 'rotate(-15deg)', border: '1px solid var(--parchment-dark)' }}/>
      </div>

      {/* Hero + interaction */}
      <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
        <DialogBox
          lines={dialogIdx >= 0 ? DIALOG_SEQUENCE[dialogIdx] : ''}
          shown={dialogIdx >= 0}
          done={dialogIdx === DIALOG_SEQUENCE.length - 1}
        />

        {/* Prompt hint */}
        {dialogIdx === -1 && !showMenu && (
          <div style={{
            position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
            marginBottom: '16px',
            fontFamily: 'var(--font-title)', fontSize: '0.65rem', letterSpacing: '0.15em',
            color: 'var(--amber)', textTransform: 'uppercase',
            animation: 'flicker 2s ease-in-out infinite',
            whiteSpace: 'nowrap',
          }}>
            ✦ Speak with the Adventurer ✦
          </div>
        )}

        <PixelHero onClick={handleHeroClick} talking={talking} />
      </div>

      {/* RPG Menu */}
      {showMenu && (
        <div style={{
          position: 'relative', zIndex: 10,
          width: 'min(480px, 90vw)',
          background: 'linear-gradient(135deg, rgba(13,10,7,0.97), rgba(26,18,8,0.97))',
          border: '2px solid var(--border-gold)',
          borderRadius: '8px',
          boxShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 20px rgba(212,136,10,0.15)',
          overflow: 'hidden',
          animation: 'pageIn 0.4s ease',
          marginBottom: '20px',
        }}>
          {/* Header */}
          <div style={{
            padding: '12px 20px', borderBottom: '1px solid var(--border-gold)',
            background: 'rgba(212,136,10,0.08)',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-gold)' }}/>
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--amber)', textTransform: 'uppercase' }}>
              What seekest thou?
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-gold)' }}/>
          </div>

          {MENU_OPTIONS.map((opt, i) => (
            <MenuOption
              key={opt.id}
              opt={opt}
              index={i}
              selected={selectedOption === opt.id}
              onSelect={handleOptionSelect}
            />
          ))}

          <div style={{ padding: '8px', borderTop: '1px solid rgba(122,92,30,0.4)', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-dim)' }}>
              Choose your path, brave soul...
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function MenuOption({ opt, index, selected, onSelect }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => onSelect(opt)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '16px 24px',
        borderBottom: '1px solid rgba(122,92,30,0.3)',
        cursor: 'pointer',
        background: selected ? 'rgba(212,136,10,0.2)' : hovered ? 'rgba(212,136,10,0.08)' : 'transparent',
        transition: 'background 0.2s',
        display: 'flex', alignItems: 'center', gap: '14px',
        animation: `pageIn 0.4s ease ${index * 0.1}s both`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Selection cursor */}
      <span style={{
        fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--amber-bright)',
        opacity: hovered || selected ? 1 : 0,
        transition: 'opacity 0.15s',
        minWidth: '16px',
      }}>▶</span>
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: hovered || selected ? 'var(--amber-bright)' : 'var(--text-primary)', transition: 'color 0.2s', fontWeight: 600 }}>
          {opt.label}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-dim)', marginTop: '2px' }}>
          {opt.sub}
        </div>
      </div>
      {/* Hover glow sweep */}
      {hovered && <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(212,136,10,0.05), transparent)',
        animation: 'shine 1s linear infinite',
        backgroundSize: '200% 100%',
      }}/>}
    </div>
  )
}