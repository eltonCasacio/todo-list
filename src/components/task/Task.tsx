import { FC } from "react";
import styles from "./Task.module.css";
import { Trash } from "@phosphor-icons/react";
import { Todo } from "../todo-list/TodoList";

interface TaskParams {
  description: string;
  done: boolean;
  handleDelete: (todo: Todo) => void;
  handleCheck: () => void;
}

export const Task: FC<TaskParams> = ({
  description,
  done,
  handleCheck,
  handleDelete
}) => {
  const handleRemove = () => {
    handleDelete({description, done})
  }

  return (
    <div className={`${styles.task} `}>
      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={handleCheck}
          checked={done}
        />
        <span className={styles.checkmark}></span>
      </label>

      <p className={`${done ? styles.done : styles.description}`}>{description}</p>

      <Trash className={styles.trash} onClick={handleRemove}/>
    </div>
  );
};
