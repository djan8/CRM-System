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
  readOnly?: boolean;
  required?: boolean;
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
  readOnly = false,
}: IInputProps): JSX.Element {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEdited?.(e.target.value);
  }
  return (
    <div className={cls.wrapper}>
      <input
        style={{ width: width, height: height }}
        className={`${cls.input} ${!isEdit && task?.isDone ? cls.done : ""}`}
        placeholder={placeholder}
        value={isEdit ? edited : task?.title}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        type="text"
        readOnly={readOnly}
        required
      />
    </div>
  );
}
