import * as React from "react";
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";
import type { Todo } from "../type.ts";
import Icon from "../ui/Icon/Icon.tsx";
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
  // const handleClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
  //   setEdited(e.target.value);
  // };
  return (
    <>
      <Input
        isEdit={isEdit}
        edited={edited}
        task={task}
        setEdited={setEdited}
        // onClick={(e) => setEdited(e.target.value)}
        // onClick={handleClick}
      />
      {/*<input value={edited} onChange={(e) => setEdited(e.target.value)} />*/}
      <Button
        onClick={changeTaskName}
        width="2rem"
        height="2rem"
        background={"DodgerBlue"}
      >
        <Icon src="/src/assets/save.svg" alt="save" />
        {/*<img src="/src/assets/save.svg" alt="save" />*/}
      </Button>
      <Button
        onClick={() => setIsEdit((prev) => !prev)}
        width="2rem"
        height="2rem"
        background={"red"}
      >
        <Icon src="/src/assets/cancel.svg" alt="cancel" />
        {/*<img src="/src/assets/cancel.svg" alt="cancel" />*/}
      </Button>
      {/*<button onClick={changeTaskName}>{children}</button>*/}
      {/*<button onClick={() => setIsEdit((prev) => !prev)}>cancel</button>*/}
    </>
  );
}
