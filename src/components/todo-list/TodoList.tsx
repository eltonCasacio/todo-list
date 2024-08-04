import { FC, useMemo } from "react";
import { ClipboardText } from "@phosphor-icons/react";
import { Task } from "../task/Task";
import styles from "./TodoList.module.css";

export interface Todo {
  description: string;
  done: boolean;
}

interface TodoListParams {
  todoList: Todo[];
  removeTodoFromList: (todo: Todo) => void;
  handleDone: (todo: Todo) => void;
}
export const TodoList: FC<TodoListParams> = ({
  todoList,
  removeTodoFromList,
  handleDone,
}) => {
  const todoDone = todoList.filter((todo) => todo.done);

  const todosElement = useMemo(() => {
    return todoList.map(({ done, description }, index) => (
      <Task
        key={`${description}-${index}`}
        handleCheck={() => handleDone({ done, description })}
        handleDelete={removeTodoFromList}
        description={description}
        done={done}
      />
    ));
  }, [handleDone, removeTodoFromList, todoList]);

  const empty = useMemo(() => {
    return (
      <div className={styles.hasNoTodoInfo}>
        <ClipboardText className={styles.clipboard}/>
        <p>
          <strong>Você ainda não tem tarefas cadastradas</strong>
        </p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    );
  }, []);

  return (
    <div className={styles.todoList}>
      <div className={styles.infoTodoCount}>
        <div className={styles.infoTodoCountCreated}>
          Tarefas criadas{" "}
          <span className={styles.infoTodoCountNumber}>{todoList.length}</span>
        </div>

        <div className={styles.infoTodoCountDone}>
          Concluídas{" "}
          <span className={styles.infoTodoCountNumber}>
            {todoDone.length} {todoList.length ? `de ${todoList.length}` : ""}
          </span>
        </div>
      </div>

      {todosElement.length ? todosElement : empty}
    </div>
  );
};
