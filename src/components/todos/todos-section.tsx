import { useState } from 'react'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { TodoSearch } from './todo-search' 
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import { TodoEmpty } from './todo-empty'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const [search, setSearch] = useState('')

  const filteredTodos = todos
  ?.filter((todo) =>
    typeof todo.name === 'string' &&
    todo.name.toLowerCase().includes(search.toLowerCase())
  )
  ?.sort((a, b) => {
    // sort by priorities first
    const priorityA = typeof a.priority === 'number' ? a.priority : 99
    const priorityB = typeof b.priority === 'number' ? b.priority : 99
    if (priorityA !== priorityB) {
      return priorityA - priorityB
    }
    // and then by name
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  })

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDismiss={refetch} />}

      <TodoForm />
      <TodoSearch value={search} onChange={setSearch} />

      <div
      className={
        !isLoading && (!filteredTodos || filteredTodos.length === 0)
      ? 'todo-container-empty'
      : 'todo-container'
  }
>
        <ul>
          {(filteredTodos ?? []).map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
        {isLoading && <Spinner />}
        {!isLoading && (!filteredTodos || filteredTodos.length === 0) && (  <TodoEmpty />  )}
      </div>
    </main>
  )
}
