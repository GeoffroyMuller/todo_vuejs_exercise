<script setup lang="ts">
import { useTodos } from '@/composables/useTodos'
import type { Todo } from '@/types'
import { ref } from 'vue'

const { todos, loading, loadAll, create } = useTodos()

const todo = ref<Partial<Todo>>({ title: '', description: '', completed: false, dueDate: '' })
const loadingCreate = ref<boolean>(false)

loadAll()

async function handleSubmit() {
  loadingCreate.value = true

  await create(todo.value)
  loadingCreate.value = false
}
</script>
<template>
  <div>
    <form @submit.prevent="handleSubmit">
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
        <input id="due_date" type="date" v-model="todo.dueDate"/>
      </div>
      <button type="submit" :disabled="loadingCreate">
        Creer {{ loadingCreate ? '...' : '' }}
      </button>
    </form>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-if="todos.length <= 0">Aucune Tâches</li>
      <li v-for="todo in todos" :key="todo.id">
        <span>{{ todo.title }}</span>
        <div v-if="todo.completed">Completed</div>
        <p>{{ todo.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="css">
form {
  .inputs {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  button {
    width: 100%;
  }
}
</style>
