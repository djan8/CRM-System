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
  type?: string;
  defaultChecked?: boolean;
  name?: string;
  defaultValue?: string;
}

export default function Input({
  task,
  edited,
  isEdit,
  setEdited,
  minLength,
  maxLength,
  placeholder,
  width,
  height,
  checked,
  readOnly = false,
  type,
  defaultChecked,
  name,
  defaultValue,
}: IInputProps): JSX.Element {
  return (
    <div className={cls.wrapper}>
      <input
        defaultValue={defaultValue}
        name={name}
        defaultChecked={defaultChecked}
        style={{ width: width, height: height }}
        className={`${cls.input} ${!isEdit && task?.isDone ? cls.done : ""}`}
        placeholder={placeholder}
        value={isEdit ? edited : task?.title}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(e) => setEdited?.(e.target.value)}
        type={type}
        readOnly={readOnly}
        checked={checked}
        required
      />
    </div>
  );
}
