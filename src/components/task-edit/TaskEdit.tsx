import * as React from "react";
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";
import type { Todo } from "../type.ts";
import Icon from "../ui/Icon/Icon.tsx";
import saveIcon from "/src/assets/save.svg";
import cancelIcon from "/src/assets/cancel.svg";

interface ITaskEditProps {
  task: Todo;
  isEdit: boolean;
  children?: React.ReactNode;
  edited: string;
  setEdited: React.Dispatch<React.SetStateAction<string>>;
  changeTaskName: () => void;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskEdit({
  task,
  isEdit,
  edited,
  setEdited,
  changeTaskName,
  setIsEdit,
}: ITaskEditProps) {
  return (
    <>
      <Input
        isEdit={isEdit}
        edited={edited}
        task={task}
        setEdited={setEdited}
      />

      <Button
        onClick={changeTaskName}
        width="2rem"
        height="2rem"
        background={"DodgerBlue"}
      >
        <Icon src={saveIcon} alt="save" />
      </Button>
      <Button
        onClick={() => setIsEdit((prev) => !prev)}
        width="2rem"
        height="2rem"
        background={"red"}
      >
        <Icon src={cancelIcon} alt="cancel" />
      </Button>
      {/*<button onClick={changeTaskName}>{children}</button>*/}
      {/*<button onClick={() => setIsEdit((prev) => !prev)}>cancel</button>*/}
    </>
  );
}
