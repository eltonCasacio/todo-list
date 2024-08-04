import { FC, useCallback, useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import styles from "./Input.module.css";

interface InputParams {
  filled?: boolean;
  handleCreateTodo: (description: string) => void;
}
export const Input: FC<InputParams> = ({ filled, handleCreateTodo }) => {
  const [description, setDescription] = useState("");

  const onClickCreate = useCallback(() => {
    handleCreateTodo(description);
  }, [description, handleCreateTodo]);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={`${styles.input} ${filled && styles.filled}`}
        type="text"
        placeholder="Adicione uma nova tarefa"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className={styles.button} onClick={onClickCreate}>
        Criar <PlusCircle className={styles.plus} />
      </button>
    </div>
  );
};
