import type { JSX, ReactNode } from "react";
import cls from "./Button.module.scss";

interface IProp {
  children?: ReactNode;
  type?: "button" | "submit"; // +
  onClick?: () => void; // +
  variant?: ButtonVariant; // +
  size?: ButtonSize;
}

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "normal" | "wide";

export default function Button({
  variant = "primary",
  children,
  type,
  onClick,
  size = "normal",
}: IProp): JSX.Element {
  return (
    <button
      className={`${cls.button} ${cls[variant]} ${cls[size]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
