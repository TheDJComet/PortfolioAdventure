export default function NESBox({ title, children, style = {}, accent = false }) {
  const bc = accent ? '#f8d800' : '#c8a46a'
  return (
    <div style={{
      background:'#000',
      border:`4px solid ${bc}`,
      boxShadow:`inset 0 0 0 2px #000, inset 0 0 0 4px ${bc}`,
      position:'relative',
      ...style,
    }}>
      {title && (
        <div style={{
          background:'#181818',
          borderBottom:`2px solid ${bc}`,
          padding:'8px 14px',
          fontFamily:"'Press Start 2P', monospace",
          fontSize:'7px',
          color: accent ? '#f8d800' : '#d89000',
          letterSpacing:'0.06em',
        }}>
          ■ {title}
        </div>
      )}
      <div style={{ padding:'16px' }}>{children}</div>
    </div>
  )
}