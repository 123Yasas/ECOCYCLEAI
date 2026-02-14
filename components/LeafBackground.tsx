
import React, { useMemo } from 'react';

const LeafBackground: React.FC = () => {
  const leafCount = 12;
  const leaves = useMemo(() => {
    return Array.from({ length: leafCount }).map((_, i) => ({
      id: i,
      delay: `${Math.random() * 20}s`,
      duration: `${15 + Math.random() * 15}s`,
      left: `${Math.random() * 100}%`,
      size: `${20 + Math.random() * 40}px`,
    }));
  }, []);

  return (
    <div className="leaf-container">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf"
          style={{
            left: leaf.left,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
            width: leaf.size,
            height: leaf.size,
          }}
        />
      ))}
    </div>
  );
};

export default LeafBackground;
