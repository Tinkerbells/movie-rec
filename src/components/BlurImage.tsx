import Image, { type ImageLoader } from "next/image";
import { type FC, useState } from "react";

import { cn } from "@/lib/utils";

interface BlurImageProps {
  src: string;
  alt: string;
  loader: ImageLoader;
  width?: number;
  height?: number;
}

export const BlurImage: FC<BlurImageProps> = ({
  src,
  alt,
  loader,
  width,
  height,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      alt={alt}
      src={src}
      width={width || 500}
      height={height || 500}
      loader={loader}
      className={cn(
        "duration-200 ease-in-out",
        isLoading ? "scale-105 blur-2xl grayscale" : "rounded-lg"
      )}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};
