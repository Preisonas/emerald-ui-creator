interface ParticleProps {
  style: React.CSSProperties;
  delay?: number;
}

const Particle = ({ style, delay = 0 }: ParticleProps) => {
  return (
    <div
      className="particle"
      style={{
        ...style,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export default Particle;
