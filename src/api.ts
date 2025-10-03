import type { Todo } from './types'

export async function fetchAllTodos(): Promise<Todo[]> {
  try {
    const res = await fetch('http://localhost:3000/todos')
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

export async function createTodo(body: Partial<Todo>): Promise<Todo[]> {
  try {
    const res = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}
