import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo } from '../types'

type TodoCreateInput = {
  name: string
  description?: string
  priority?: number
}

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Todo,
    ApiError,
    TodoCreateInput,
    { previousTodos: Todo[] | undefined }
  >({
    mutationKey: ['createTodo'],
    mutationFn: async (newTodo: TodoCreateInput) => {
      return await todoApi.createTodo(newTodo)
    },
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return [
          ...(old || []),
          {
            id: Date.now(),
            name: newTodo.name,
            completed: false,
            description: newTodo.description,
            priority: newTodo.priority ?? 1,
          },
        ]
      })

      return { previousTodos }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
