import type { JSX, ReactNode } from "react";
import cls from "./Button.module.scss";

interface IProp {
  children?: ReactNode;
  type?: "button" | "submit"; // +
  onClick?: () => void; // +
  variant?: ButtonVariant; // +
}

type ButtonVariant = "primary" | "secondary" | "danger";

export default function Button({
  variant = "primary",
  children,
  type,
  onClick,
}: IProp): JSX.Element {
  return (
    <button
      className={`${cls.button} ${cls[variant]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
