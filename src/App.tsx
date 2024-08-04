import "./global.css";
import { Header } from "./components/header/Header";
import { Input } from "./components/input/Input";
import styles from "./App.module.css";
import { Todo, TodoList } from "./components/todo-list/TodoList";
import { useCallback, useMemo, useState } from "react";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoToList = useCallback(
    (description: string) => setTodos([...todos, { done: false, description }]),
    [todos]
  );

  const removeTodoFromList = useCallback(
    (todoToRemove: Todo) => {
      const todosRemoved = todos.filter(
        (todo) => todo.description !== todoToRemove.description
      );
      setTodos(todosRemoved);
    },
    [todos]
  );

  const handleDone = useCallback(
    (todo: Todo) => {
      const updatedTodos = todos.map((t) => {
        if (t.description === todo.description) t.done = !t.done;
        return t;
      });
      setTodos(updatedTodos);
    },
    [todos]
  );

  const buildTodoList = useMemo(
    () => (
      <TodoList
        todoList={todos}
        removeTodoFromList={removeTodoFromList}
        handleDone={handleDone}
      />
    ),
    [handleDone, removeTodoFromList, todos]
  );

  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.container}>
        <Input handleCreateTodo={addTodoToList} />

        <div className={styles.todoList}>{buildTodoList}</div>
      </div>
    </div>
  );
}

export default App;
