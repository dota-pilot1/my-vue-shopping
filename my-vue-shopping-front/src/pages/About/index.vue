<template>
  <div class="about-page">
    <HeroSection />
    <FeaturesSection />
    <TechStackSection />
    <StatsSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from './components/HeroSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import TechStackSection from './components/TechStackSection.vue';
import StatsSection from './components/StatsSection.vue';
</script>

<style scoped>
.about-page {
  width: 100%;
  overflow-x: hidden;
}
</style>
