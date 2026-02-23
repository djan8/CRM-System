import * as React from "react";
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";
import type { Todo } from "../../types/type.ts";
import Icon from "../ui/Icon/Icon.tsx";
import saveIcon from "/src/assets/save.svg";
import cancelIcon from "/src/assets/cancel.svg";

interface ITaskEditProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
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
  setError,
}: ITaskEditProps) {
  const handleChangeStateValue = () => {
    setIsEdit((prev) => !prev);
    setError("");
    setEdited(task?.title);
  };

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
        // нажимаю сюда состояние меняется и значение инпута меняется на изначальное
        onClick={handleChangeStateValue}
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
