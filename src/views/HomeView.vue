<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import { useTodos } from '@/composables/useTodos'
import type { Todo } from '@/types'
import { ref } from 'vue'

const { todos, loading, loadAll, create } = useTodos()

const todoDefaultValue = { title: '', description: '', completed: false, dueDate: '' }

const todo = ref<Partial<Todo>>(todoDefaultValue)
const loadingCreate = ref<boolean>(false)

loadAll()

async function handleSubmit() {
  loadingCreate.value = true
  try {
    await create(todo.value)
    loadingCreate.value = false
  } catch (error) {
    console.error(error)
    loadingCreate.value = false
  }

  loadingCreate.value = false
  todo.value = { title: '', description: '', completed: false, dueDate: '' }
}
</script>
<template>
  <div>
    <form class="mb-8 flex flex-col gap-6" @submit.prevent="handleSubmit">
      <div class="inputs">
        <label for="title">title</label>
        <input id="title" type="text" v-model="todo.title" />
        <label for="description">description</label>
        <input id="description" type="text" v-model="todo.description" />
        <div>
          <label for="completed">completed</label>
          <input id="completed" type="checkbox" v-model="todo.completed" />
        </div>
        <label for="due_date">date</label>
        <input id="due_date" type="date" v-model="todo.dueDate" />
      </div>
      <button
        class="bg-cyan-800 text-white rounded-full p-2 hover:cursor-pointer"
        type="submit"
        :disabled="loadingCreate"
      >
        Creer {{ loadingCreate ? '...' : '' }}
      </button>
    </form>
    <div v-if="loading">Loading...</div>
    <div class="flex flex-wrap gap-1.5" v-else>
      <div v-if="todos.length <= 0">Aucune Tâches</div>
      <TodoItem v-for="todo in todos" :todo :key="todo.id" />
    </div>
  </div>
</template>

<style scoped lang="css">
@reference "tailwindcss";
form {
  .inputs {
    display: flex;
    flex-direction: column;
    justify-content: start;
    input {
      @apply rounded-md border-gray-600 shadow px-3 py-1;
    }
  }
  button {
    width: 100%;
  }
}
</style>
