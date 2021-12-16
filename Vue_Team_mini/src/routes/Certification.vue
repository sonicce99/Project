<template>
  <!-- 생각이 바뀌었다면 홈으로 -->
  <RouterView/>
  <RouterLink
    class="btn-anchor btn-16"
    to="/"
  >
    HOME
  </RouterLink>
</template>

<style lang="scss" scoped>
a {
  position: absolute;
  top: 40px;
  left: 40px;
}
</style>
