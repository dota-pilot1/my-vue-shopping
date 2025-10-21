<template>
  <button
    class="btn"
    :class="[
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-disabled': disabled }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 크기 */
.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
}

.btn-md {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
}

.btn-lg {
  padding: 0.8rem 1.6rem;
  font-size: 1.125rem;
}

/* 스타일 변형 */
.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover:not(.btn-disabled) {
  background-color: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background-color: #e0e7ff;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover:not(.btn-disabled) {
  background-color: #667eea;
  color: white;
}

.btn-danger {
  background-color: #f56565;
  color: white;
}

.btn-danger:hover:not(.btn-disabled) {
  background-color: #e53e3e;
}

.btn-success {
  background-color: #42b883;
  color: white;
}

.btn-success:hover:not(.btn-disabled) {
  background-color: #359268;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
