import { useState, type ChangeEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'
import { Link } from 'react-router'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')

  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    console.log('Form submitted with todo:', todoName)
    mutate(todoName)
  }

  return (
    <div className="input-group">
      <input
        value={todoName}
        onChange={handleInputChange}
        name="todo-text"
        placeholder="What needs to be done?"
      />
      <button onClick={handleSubmit} type="submit">
        Add
      </button>
      <Link to={`/newTodo`} className="btn-primary">
        Add with more details
      </Link>
    </div>
  )
}
