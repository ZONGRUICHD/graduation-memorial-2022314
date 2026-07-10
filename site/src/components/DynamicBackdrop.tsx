export function DynamicBackdrop() {
  return (
    <div className="dynamic-backdrop" aria-hidden="true">
      <span className="backdrop-glow glow-blue" />
      <span className="backdrop-glow glow-red" />
      <span className="backdrop-glow glow-yellow" />
      <span className="backdrop-glow glow-green" />
      <span className="backdrop-glow glow-cyan" />
    </div>
  )
}
