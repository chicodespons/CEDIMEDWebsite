"use client";

import { useState } from 'react';

interface DefaultImageComponentProps {
    image: string;
    defaultImage: string;
    alt: string;
    width: number;
    height: number;
    className: string;
}

function DefaultImageComponent({image, defaultImage, alt, width, height, className} : DefaultImageComponentProps) {

  const [src, setSrc] = useState(image);

  const handleImageError = () => {
    setSrc(defaultImage); // Set path to your default image
  };

  return (
    <img
      src={src || defaultImage}
      alt={alt}
      width={width}
      height={height}
      onError={handleImageError} // Fallback on error
      className={className}
    />
  );
}

export default DefaultImageComponent;
