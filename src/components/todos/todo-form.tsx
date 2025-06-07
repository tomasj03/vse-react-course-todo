import { useState, type ChangeEvent } from "react";
import { useTodoCreate } from "../../hooks/useTodoCreate";
import { Link } from "react-router";

export const TodoForm = () => {
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState<number>(1); // default priority set to 1

  const { mutate } = useTodoCreate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(Number(e.target.value));
  };

  const handleSubmit = () => {
    if (!todoName.trim()) return;
    mutate({
      name: todoName.trim(),
      description: undefined,
      priority,
    });
    setTodoName("");
    setPriority(1); // set default value back
  };

  return (
    <div className="input-group">
      <input
        value={todoName}
        onChange={handleInputChange}
        name="todo-text"
        placeholder="What needs to be done?"
      />
        <select
        value={priority}
        onChange={handlePriorityChange}
        name="priority"
        className="priority-select"
      >
        <option value={1}>Priority 1</option>
        <option value={2}>Priority 2</option>
        <option value={3}>Priority 3</option>
      </select>
      <button onClick={handleSubmit} type="submit" className="btn-primary">
        Quick add
      </button>
      <Link to="/newTodo" className="btn-primary description">
        Add with description
      </Link>
    </div>
  );
};
