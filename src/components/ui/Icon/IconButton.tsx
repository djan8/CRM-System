import type { JSX } from "react";
import cls from "./IconButton.module.scss";

export default function IconButton({
  src,
  alt,
}: {
  src: string;
  alt: string;
}): JSX.Element {
  return (
    <button className={cls.icon}>
      <img src={src} alt={alt} />
    </button>
  );
}
