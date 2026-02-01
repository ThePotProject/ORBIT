import React from 'react';

interface StarProps {
  className?: string;
  fill?: string;
}

const Star: React.FC<StarProps> = ({ className = "w-4 h-4", fill = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" 
        fill={fill}
      />
    </svg>
  );
};

export default Star;