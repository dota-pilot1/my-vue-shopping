<template>
  <footer class="footer">
    <div class="footer-container">
      <p>&copy; 2025 Vue Shopping. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #a0aec0;
  padding: 2rem;
  margin-top: auto;
  transition: background-color 0.3s;
}

:global(.dark) .footer {
  background-color: #1a1a1a;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

p {
  margin: 0;
  font-size: 0.95rem;
}
</style>
