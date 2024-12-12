import React, { useEffect, useId } from 'react';

interface AdContainerProps {
  position: 'top' | 'bottom';
  className?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({ position, className = '' }) => {
  const id = `${position}-ad-container`;
  
  return (
    <div 
      id={id}
      className={`w-full overflow-hidden min-h-[100px] ${className}`}
      data-ad-position={position}
    />
  );
};