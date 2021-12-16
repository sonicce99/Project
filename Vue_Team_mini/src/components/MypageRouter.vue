<template>
  <nav>
    <RouterLink
      class="btn-list btn-anchor btn-16"
      :to="{ name: 'PurchaseList' }"
    >
      구매 내역
    </RouterLink>
    <RouterLink class="btn-list btn-anchor btn-16" :to="{ name: 'MyAccount' }">
      내 계좌
    </RouterLink>
    <RouterLink
      class="btn-list btn-anchor btn-16"
      :to="{
        name: 'ChangeUserInfo',
        query: {
          name: currentUser.displayName,
        },
      }"
    >
      내 정보 수정
    </RouterLink>
  </nav>
</template>

<script>
export default {
  props: ['currentUser'],
}
</script>

<style lang="scss" scoped>
nav {
  @include column-flexbox();
  width: 220px;

  .btn-anchor {
    border: none;
    border-radius: 0;
  }

  .btn-list {
    @include flexbox();
    width: 80%;
    font-size: 14px;
    font-weight: 500;

    text-decoration: none;
    padding: 1rem;
    border-bottom: 1px solid $border;

    &:hover {
      color: $blue;
    }
  }
}
</style>
