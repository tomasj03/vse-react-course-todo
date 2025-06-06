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

  const filteredTodos = todos?.filter((todo) =>
      typeof todo.name === 'string' &&
      todo.name.toLowerCase().includes(search.toLowerCase())
  )

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
