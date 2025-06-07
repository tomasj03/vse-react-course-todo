import { Link } from 'react-router'
import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoToggle'

type TodoItemProps = {
  todo: Todo
}
export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()

  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const handleToggleTodo = () => {
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  return (
    <li className={todo.completed ? 'completed' : ''}>
        <span className={`todo-priority todo-priority-${todo.priority}`}>
         Priority: {todo.priority}
        </span>
      <span className="item-name">{todo.name}</span>
      <span className="item-description">{todo.description}</span>
      <button onClick={handleToggleTodo} className="toggle">
        {todo.completed ? 'Undo' : 'Completed'}
      </button>
      <button onClick={handleDeleteTodo}>Delete</button>
      <Link to={`/todos/${todo.id}`} className="link">
        Go to detail
      </Link>
    </li>
  )
}
