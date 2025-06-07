import { useState } from "react"
import { Header } from "../components/header"
import { useNavigate } from "react-router"
import { useTodoCreate } from "../hooks/useTodoCreate"

const TodoAddPage = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<number>(0) // default prio
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { mutate, isPending } = useTodoCreate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Name is required!")
      return
    }
    if (priority === 0) {
        setError("Priority is required!")
        return
      }
    setError(null)
    mutate(
      {
        name: name.trim(),
        description: description.trim() || undefined,
        priority,
      },
      {
        onSuccess: () => {
          navigate("/")
        },
        onError: () => {
          setError("Failed to add todo. Try again.")
        }
      }
    )
  }

  return (
    <div className="todo-add-container">
      <Header title="Add new task" subtitle="Please fill all attributes" />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            placeholder="Name (required)"
            className="input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={isPending}
            autoFocus
          />
        </div>
        <div className="input-group">
          <input
            placeholder="Description"
            className="input"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="priority-description">
            <span>Please select priority:</span>
        </div>
        <div className="form-group priority-group">
          {[1, 2, 3].map((num) => (
            <label
              key={num}
              className={`form-todo-priority form-todo-priority-${num} ${priority === num ? "selected" : ""}`}
              style={{ cursor: isPending ? "not-allowed" : "pointer" }}
            >
              <input
                type="radio"
                name="priority"
                value={num}
                checked={priority === num}
                onChange={() => setPriority(num)}
                disabled={isPending}
                style={{ display: "none" }}
              />
              Priority {num}
            </label>
          ))}
        </div>
        

        {error && <div style={{ color: "red"}}>{error}</div>}
        <button
          type="submit"
          className="btn-primary"
          disabled={isPending}
          style={{ width: "100%" }}
        >
          {isPending ? "Adding..." : "Add todo"}
        </button>
      </form>
    </div>
  )
}

export default TodoAddPage
