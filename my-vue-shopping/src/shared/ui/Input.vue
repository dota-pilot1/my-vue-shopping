<template>
  <input
    class="input"
    :class="{ 'input-error': error }"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <span v-if="error" class="error-message">{{ error }}</span>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input.input-error {
  border-color: #f56565;
}

.input.input-error:focus {
  box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);
}

.error-message {
  display: block;
  color: #f56565;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
