'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  quality?: number;
  sizes?: string;
  style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fallback image for errors
  const fallbackSrc = '/placeholder.svg';
  
  // Placeholder blur base64 (very small)
  const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  
  if (!isMounted) {
    // SSR fallback
    return <div className={cn("bg-gray-800/30", className)} style={{ width, height, ...style }} />;
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      <Image
        src={isError ? fallbackSrc : src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        quality={quality}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-800/30 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;