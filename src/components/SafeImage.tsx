"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & { fallbackSrc?: string };

export default function SafeImage({
  fallbackSrc = "/placeholder.svg",
  ...props
}: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      {...props}
      src={failed ? (fallbackSrc as any) : (props.src as any)}
      onError={() => setFailed(true)}
    />
  );
}
