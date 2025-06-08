import { useNavigate } from "react-router";
import { useTodoQuery } from "../hooks/useTodoQuery";
import { useTodoUpdate } from "../hooks/useTodoUpdate";
import { Header } from "../components/header";
import { TodoFormAdvanced } from "../components/todos/todo-form-advanced";
import { useState } from "react";

const TodoEditPage = () => {
  const { data: todo, isLoading, isError } = useTodoQuery();
  const { mutate: updateTodo, isPending } = useTodoUpdate();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>; // could be improved
  if (isError || !todo) return <div>Todo not found!</div>; // could be improved too

  return (
    <div className="todo-add-container">
      <Header title={`Edit: ${todo.name}`} subtitle="Edit your todo" />
      {/* component TodoFormAdvanced is used instead of basic form here, because the same form is used for creating new todo*/}
      <TodoFormAdvanced
        initialName={todo.name}
        initialDescription={todo.description}
        initialPriority={todo.priority}
        loading={isPending}
        error={error}
        submitLabel="Save"
        onSubmit={({ name, description, priority }) => {
          updateTodo(
            {
              id: todo.id,
              name,
              description: description || undefined,
              priority,
            },
            {
              onSuccess: () => navigate(`/todos/${todo.id}`),
              onError: () => setError("Failed to update todo."),
            }
          );
        }}
      />
      <div className="go-back-home-add">
        <button
          className="back-button"
          onClick={() => navigate(`/todos/${todo.id}`)}
        >
          Back to detail
        </button>
      </div>
    </div>
  );
};

export default TodoEditPage;
