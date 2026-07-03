<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <main class="page">
    <h1>Vue 3 + Vite</h1>
    <button type="button" class="btn" @click="count++">count is {{ count }}</button>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 12px;
  padding: 24px;
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #cfcfcf;
  background: #fff;
  cursor: pointer;
}
</style>
