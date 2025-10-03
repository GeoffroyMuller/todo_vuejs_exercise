import { createTodo, fetchAllTodos } from '@/api'
import type { Todo } from '@/types'
import { ref } from 'vue'

export function useTodos() {
  const todos = ref<Todo[]>([])
  const loading = ref<boolean>(false)

  async function loadAll() {
    loading.value = true
    todos.value = await fetchAllTodos()
    loading.value = false
    return todos.value
  }

  async function create(todo: Partial<Todo>) {
    await createTodo(todo)
    await loadAll()
    return todos.value
  }

  return {
    todos,
    loading,
    loadAll,
    create
  }
}
