import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todoApi";
import type { Todo } from "../types";

export const useTodoUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Todo, 
    Error, 
    { id: number; name: string; description?: string; priority?: number },
    { previousTodos?: Todo[]; previousTodo?: Todo }
    >({
    mutationFn: async (update) => await todoApi.updateTodo(update),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      await queryClient.cancelQueries({ queryKey: ['todo', String(variables.id)] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      const previousTodo = queryClient.getQueryData<Todo>(['todo', String(variables.id)]);

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) =>
        (oldTodos || []).map((todo) =>
          todo.id === variables.id
            ? { ...todo, ...variables }
            : todo
        )
      );

      if (previousTodo) {
        queryClient.setQueryData<Todo>(['todo', String(variables.id)], {
          ...previousTodo,
          ...variables,
        });
      }

      return { previousTodos, previousTodo };
    },

    onError: (_error, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      if (context?.previousTodo) {
        queryClient.setQueryData(['todo', String(variables.id)], context.previousTodo);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', String(variables.id)] });
    },
  });
};
