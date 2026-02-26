import cls from "./Input.module.scss";
import type { Todo } from "../../../types/type.ts";
import * as React from "react";
import type { JSX } from "react";
interface IInputProps {
  task?: Todo;
  edited?: string;
  isEdit?: boolean;
  setEdited?: React.Dispatch<React.SetStateAction<string>> | undefined;
  setTask?: React.Dispatch<React.SetStateAction<string>>;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  width?: string;
  height?: string;
  checked?: boolean;
  readOnly?: boolean;
  required?: boolean;
  type?: "checkbox" | "text" | "submit";
  defaultChecked?: boolean;
  name?: string;
  defaultValue?: string;
  onChange?: any;
  value?: string;
  onClick?: any;
  style?: any;
  className?: any;
}

export default function Input({
  task,
  edited,
  value,
  isEdit,
  minLength,
  maxLength,
  placeholder,
  checked,
  readOnly = false,
  type,
  defaultChecked,
  name,
  defaultValue,
  onChange,
  onClick,
  style,
  className,
}: IInputProps): JSX.Element {
  return (
    <div className={cls.wrapper}>
      <input
        onClick={onClick}
        defaultValue={defaultValue}
        name={name}
        defaultChecked={defaultChecked}
        style={style}
        className={className}
        placeholder={placeholder}
        value={isEdit ? edited : value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        readOnly={readOnly}
        checked={checked}
        required
      />
    </div>
  );
}
