<template>
  <div class="home-page">
    <h1>🛍️ 우리의 상품들</h1>
    <p class="subtitle">최고의 상품을 저렴한 가격에 만나보세요</p>

    <SearchBar @search="handleSearch" />

    <div v-if="searchResults.length > 0" class="search-info">
      '<strong>{{ lastSearchQuery }}</strong>' 검색 결과: {{ searchResults.length }}개
      <Button size="sm" variant="secondary" @click="clearSearch">
        검색 취소
      </Button>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in displayedProducts"
        :key="product.id"
        :name="product.name"
        :category="product.category"
        :description="product.description"
        :price="product.price"
        :original-price="product.originalPrice"
        :image="product.image"
        :badge="product.badge"
        @add-to-cart="handleAddToCart(product)"
      />
    </div>

    <div v-if="displayedProducts.length === 0" class="no-products">
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SearchBar from '../shared/widgets/SearchBar.vue'
import ProductCard from '../shared/widgets/ProductCard.vue'
import Button from '../shared/ui/Button.vue'

const searchQuery = ref('')
const lastSearchQuery = ref('')

// 샘플 상품 데이터
const products = ref([
  {
    id: 1,
    name: '무선 이어폰',
    category: 'Electronics',
    description: '최고의 음질과 편안함',
    price: 89000,
    originalPrice: 129000,
    image: 'https://via.placeholder.com/300x200?text=Wireless+Earbuds',
    badge: '31% 할인'
  },
  {
    id: 2,
    name: 'USB-C 충전 케이블',
    category: 'Accessories',
    description: '빠른 충전, 오래가는 케이블',
    price: 12000,
    originalPrice: null,
    image: 'https://via.placeholder.com/300x200?text=USB-C+Cable',
    badge: ''
  },
  {
    id: 3,
    name: '스마트 워치',
    category: 'Electronics',
    description: '건강 추적과 스타일',
    price: 249000,
    originalPrice: 349000,
    image: 'https://via.placeholder.com/300x200?text=Smart+Watch',
    badge: '새상품'
  },
  {
    id: 4,
    name: 'Bluetooth 스피커',
    category: 'Electronics',
    description: '강력한 사운드, 포터블',
    price: 59000,
    originalPrice: 89000,
    image: 'https://via.placeholder.com/300x200?text=BT+Speaker',
    badge: '33% 할인'
  },
  {
    id: 5,
    name: '노트북 가방',
    category: 'Accessories',
    description: '내구성 있고 세련된 디자인',
    price: 45000,
    originalPrice: null,
    image: 'https://via.placeholder.com/300x200?text=Laptop+Bag',
    badge: ''
  },
  {
    id: 6,
    name: '무선 마우스',
    category: 'Electronics',
    description: '정밀한 조작감, 조용한 클릭',
    price: 35000,
    originalPrice: 55000,
    image: 'https://via.placeholder.com/300x200?text=Wireless+Mouse',
    badge: '36% 할인'
  }
])

const displayedProducts = computed(() => {
  if (searchQuery.value.length === 0) {
    return products.value
  }
  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const searchResults = computed(() => displayedProducts.value)

const handleSearch = (query) => {
  searchQuery.value = query
  lastSearchQuery.value = query
}

const clearSearch = () => {
  searchQuery.value = ''
  lastSearchQuery.value = ''
}

const handleAddToCart = (product) => {
  alert(`'${product.name}'이(가) 장바구니에 추가되었습니다!`)
}
</script>

<style scoped>
.home-page {
  padding: 2rem 0;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.subtitle {
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.search-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #edf2f7;
  border-radius: 6px;
  margin-bottom: 2rem;
  color: #4a5568;
}

.search-info strong {
  color: #667eea;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.no-products {
  text-align: center;
  padding: 3rem 2rem;
  background-color: #f7fafc;
  border-radius: 8px;
  color: #718096;
}
</style>
