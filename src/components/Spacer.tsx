'use client';

interface SpacerProps {
  size?: number; // Size in pixels
  direction?: 'vertical' | 'horizontal'; // Direction of the spacer
}

const Spacer: React.FC<SpacerProps> = ({ size = 16, direction = 'vertical' }) => {
  const style = direction === 'vertical' ? { height: size } : { width: size };
  return <div style={style} />;
};

export default Spacer;
