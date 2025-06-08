import { Header } from "../components/header";
import { Link, useLocation, useNavigate } from "react-router";
import { useTodoCreate } from "../hooks/useTodoCreate";
import { TodoFormAdvanced } from "../components/todos/todo-form-advanced";
import { useState } from "react";

const TodoAddPage = () => {
  const location = useLocation();
  const prefillName = location.state?.name || "";
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutate, isPending } = useTodoCreate();

  return (
    <div className="todo-add-container">
      <Header title="Add new task" subtitle="Please fill all attributes" />
      {/* component TodoFormAdvanced is used instead of basic form here, because the same form is used for creating new todo*/}
      <TodoFormAdvanced
        initialName={prefillName}
        initialPriority={0}
        loading={isPending}
        error={error}
        submitLabel="Add todo"
        onSubmit={({ name, description, priority }) => {
          mutate(
            { name, description: description || undefined, priority },
            {
              onSuccess: () => navigate("/"),
              onError: () => setError("Failed to add todo. Try again."),
            }
          );
        }}
      />
      <div className="go-back-home-add">
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default TodoAddPage;
