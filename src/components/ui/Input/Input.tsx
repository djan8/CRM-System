import cls from "./Input.module.scss";

import { type JSX } from "react";
import * as React from "react";
interface IInputProps {
  checked?: boolean; // +
  readOnly?: boolean; // +
  required?: boolean; // +
  type?: "checkbox" | "text" | "submit"; // +
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string; // +
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  className?: string; //+
}

export default function Input({
  value,
  checked,
  readOnly = false,
  type,
  onChange,
  onClick,
  className,
}: IInputProps): JSX.Element {
  return (
    <div className={cls.wrapper}>
      <input
        onClick={onClick}
        className={className}
        value={value}
        onChange={onChange}
        type={type}
        readOnly={readOnly}
        checked={checked}
        required
      />
    </div>
  );
}
