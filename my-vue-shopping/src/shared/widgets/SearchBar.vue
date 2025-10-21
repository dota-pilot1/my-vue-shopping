<template>
  <div class="search-bar">
    <Input
      v-model="searchQuery"
      type="text"
      placeholder="상품명, 카테고리 검색..."
      @keyup.enter="handleSearch"
    />
    <Button variant="primary" @click="handleSearch">
      🔍 검색
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/shared/ui/Button.vue'
import Input from '@/shared/ui/Input.vue'

const searchQuery = ref('')

const emit = defineEmits(['search'])

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.search-bar > :first-child {
  flex: 1;
  min-width: 200px;
}
</style>
