const DecorativeMotif = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="180" height="28" viewBox="0 0 180 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M90 2L102 14L90 26L78 14Z" fill="none" stroke="#D4A853" strokeWidth="0.8" opacity="0.25" />
    <path d="M90 7L97 14L90 21L83 14Z" fill="none" stroke="#2D8B6F" strokeWidth="0.6" opacity="0.2" />
    <circle cx="90" cy="14" r="2.5" fill="#D4A853" opacity="0.12" />
    <line x1="72" y1="14" x2="15" y2="14" stroke="#D4A853" strokeWidth="0.4" opacity="0.12" />
    <line x1="108" y1="14" x2="165" y2="14" stroke="#D4A853" strokeWidth="0.4" opacity="0.12" />
    {[30, 45, 60].map(x => <circle key={x} cx={x} cy={14} r={1} fill="#2D8B6F" opacity={0.18} />)}
    {[120, 135, 150].map(x => <circle key={x} cx={x} cy={14} r={1} fill="#2D8B6F" opacity={0.18} />)}
  </svg>
)
export default DecorativeMotif
