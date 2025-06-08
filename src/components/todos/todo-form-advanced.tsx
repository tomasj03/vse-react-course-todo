import { useState, useEffect } from "react";

type TodoFormProps = {
  initialName?: string;
  initialDescription?: string;
  initialPriority?: number;
  loading?: boolean;
  error?: string | null;
  submitLabel?: string;
  onSubmit: (values: {
    name: string;
    description: string;
    priority: number;
  }) => void;
};

export const TodoFormAdvanced = ({
  initialName = "",
  initialDescription = "",
  initialPriority = 0,
  loading = false,
  error,
  submitLabel = "Save",
  onSubmit,
}: TodoFormProps) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState<number>(initialPriority);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
    setPriority(initialPriority);
  }, [initialName, initialDescription, initialPriority]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setLocalError("Name is required!");
      return;
    }
    if (priority === 0) {
      setLocalError("Priority is required!");
      return;
    }
    setLocalError(null);
    onSubmit({ name: name.trim(), description: description.trim(), priority });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          placeholder="Name (required)"
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          autoFocus
        />
      </div>
      <div className="input-group description-add">
        <input
          placeholder="Description"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="priority-description">
        <span>Please select priority:</span>
      </div>
      <div className="form-group priority-group">
        {[1, 2, 3].map((num) => (
          <label
            key={num}
            className={`form-todo-priority form-todo-priority-${num} ${
              priority === num ? "selected" : ""
            }`}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            <input
              type="radio"
              name="priority"
              value={num}
              checked={priority === num}
              onChange={() => setPriority(num)}
              disabled={loading}
              style={{ display: "none" }}
            />
            Priority {num}
          </label>
        ))}
      </div>
      {(error || localError) && (
        <div style={{ color: "red" }}>{error || localError}</div>
      )}
      <button
        type="submit"
        className="btn-primary save-edit"
        disabled={loading}
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};
