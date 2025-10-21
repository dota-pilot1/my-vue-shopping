<template>
  <Card class="product-card">
    <template #header>
      <div class="product-image">
        <img :src="image" :alt="name" />
        <span v-if="badge" class="badge">{{ badge }}</span>
      </div>
    </template>

    <h3 class="product-name">{{ name }}</h3>
    <p class="product-category">{{ category }}</p>
    <p class="product-description">{{ description }}</p>

    <div class="product-footer">
      <div class="product-price">
        <span class="price">{{ formatPrice(price) }}</span>
        <span v-if="originalPrice" class="original-price">
          {{ formatPrice(originalPrice) }}
        </span>
      </div>
      <Button size="sm" variant="primary" @click="handleAddToCart">
        🛒 담기
      </Button>
    </div>
  </Card>
</template>

<script setup>
import Card from '../ui/Card.vue'
import Button from '../ui/Button.vue'

defineProps({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    default: null
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Product'
  },
  badge: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['add-to-cart'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price)
}

const handleAddToCart = () => {
  emit('add-to-cart')
}
</script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.product-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f56565;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
}

.product-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.product-category {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-description {
  margin: 0 0 1rem 0;
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.product-price {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #667eea;
}

.original-price {
  font-size: 0.875rem;
  color: #a0aec0;
  text-decoration: line-through;
}
</style>
