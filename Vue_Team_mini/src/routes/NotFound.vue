<template>
  <div class="wrapper">
    <div class="inner">
      <h1>404 Page Not Found</h1>
      <p>요청하신 페이지를 찾을 수 없습니다</p>
      <div class="link">
        <RouterLink class="btn btn-primary btn-16" to="/"> 홈으로</RouterLink>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
  }
  .link {
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
