import { Link, useNavigate } from 'react-router'
import { Header } from '../components/header'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoToggle } from '../hooks/useTodoToggle'
import { useTodoDelete } from '../hooks/useTodoDelete'

const TodoDetailPage = () => {
  const { data: todo, isError } = useTodoQuery()
  const { mutate: toggleTodo } = useTodoToggle()
  const { mutate: deleteTodo } = useTodoDelete()
  const navigate = useNavigate()

  const handleToggle = () => {
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  const handleDelete = () => {
    if (window.confirm("Do you really want to delete the task?")) {
      deleteTodo(todo.id, {
        onSuccess: () => {
          navigate('/')
        }
      })
    }
  }

  if (isError || !todo) {
    return (
      <div className="todo-detail-error">
        <p>Could not load todo item.</p>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <Header title="Todo Detail" subtitle="Here is detail of todo" />
      <div className="todo-detail">
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>
          <div className="todo-detail-status">
            Status:{' '}
            <span className={todo.completed ? 'completed' : 'active'}>
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          <div className="todo-detail-status">
            Priority: <span className={'completed'}>{todo.priority}</span>
          </div>

          {todo.description && (
            <div className="todo-detail-description">
              <p>{todo.description}</p>
            </div>
          )}

        <button onClick={handleToggle} className="button-detail">
        {todo.completed ? "Undo" : "Mark as Completed"}
      </button>
      <button onClick={handleDelete} className="button-detail delete">
        Delete
      </button>
        </div>

        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    </>
  )
}

export default TodoDetailPage
