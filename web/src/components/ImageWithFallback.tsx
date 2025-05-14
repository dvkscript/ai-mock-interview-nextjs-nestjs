'use client';

import Image from 'next/image';
import { useState } from 'react';

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string;
  className?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  className,
  ...props
}: ImageWithFallbackProps & Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
      onError={() => {
        setImgSrc(fallbackSrc || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%233B82F6'%3E%3Cpath fill-rule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clip-rule='evenodd' /%3E%3C/svg%3E`);
      }}
    />
  );
} 