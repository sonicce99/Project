<template>
  <nav>
    <RouterLink :to="{ name: 'AllProducts' }">
      제품 조회
    </RouterLink>
    <RouterLink :to="{ name: 'SalesDetails' }">
      판매 내역
    </RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    width: 80%;
    display: block;
    text-decoration: none;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px  solid $border;
    &:hover {
      color: $blue;
    }
  }
}
</style>
