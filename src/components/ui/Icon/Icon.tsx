import type { JSX } from "react";

export default function Icon({
  src,
  alt,
}: {
  src: string;
  alt: string;
}): JSX.Element {
  return <img src={src} alt={alt} />;
}
