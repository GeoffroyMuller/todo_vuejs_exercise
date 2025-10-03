<script setup lang="ts">
import type { Todo } from '@/types'

defineProps<{
  todo: Todo
}>()
</script>
<template>
  <div class="shadow rounded-2xl p-2 min-w-[100px]">
    <div class="flex items-center justify-between">
      <span class="text-lg">{{ todo.title }}</span>
      <div class="bg-blue-300 text-blue-950 rounded-md px-1 py-0.5 text-xs" v-if="todo.completed">Completed</div>
    </div>

    <p class="text-md">{{ todo.description }}</p>
  </div>
</template>

<style scoped lang="css"></style>
