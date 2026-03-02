import type { JSX } from "react";
import cls from "./IconButton.module.scss";

export default function IconContainer({
  src,
  alt,
}: {
  src: string;
  alt: string;
}): JSX.Element {
  return <img className={cls.icon} src={src} alt={alt} />;
}
