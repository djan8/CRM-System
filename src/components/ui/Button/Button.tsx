import type { JSX, ReactNode } from "react";
import cls from "./Button.module.scss";

interface IProp {
  children?: ReactNode;
  width?: string;
  height?: string;
  background?: string;
  color?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  // onChange?: () => void;
}

export default function Button({
  children,
  type,
  width,
  height,
  background,
  color,
  onClick,
  // onChange,
}: IProp): JSX.Element {
  return (
    <button
      className={cls.button}
      style={{ width, height, background, color }}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
