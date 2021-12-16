<template>
  <div class="wrapper">
    <div class="my-tab">
      <div class="my-info">
        <img
          :src="
            currentUser.profileImg
              ? currentUser.profileImg
              : 'https://via.placeholder.com/150'
          "
          :alt="`${currentUser.displayName}`"
        />
        <strong>{{ currentUser.displayName }}</strong>
        <span>{{ currentUser.email }}</span>
      </div>

      <MypageRouter :currentUser="currentUser" />
      <RouterLink class="btn-primary btn-16 move-home" to="/">
        홈으로
      </RouterLink>
    </div>

    <RouterView />
  </div>
</template>

<script>
import MypageRouter from '~/components/MypageRouter'

export default {
  components: {
    MypageRouter,
  },
  data() {
    return {
      isActive: 'active',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  @include flexbox(start, center);
  height: 90vh;
  margin: 2rem 3.2rem;

  .my-tab {
    @include column-flexbox(start, center);
    width: 220px;
    height: 90vh;
    position: relative;
    margin-right: 50px;
    padding: 20px 0;
    border-radius: 6px;
    border: 1px solid $border;

    .my-info {
      @include column-flexbox();
      height: 10rem;
      margin-bottom: 1rem;

      strong {
        @include text-style(18, $dark);
        margin-bottom: 0.2rem;
      }

      span {
        @include text-style(14, $primary);
      }
    }

    img {
      width: 3rem;
      height: 3rem;
      padding: 0 !important;
      margin-bottom: 1rem;
      border-radius: 50%;
      padding-left: 0.7rem;
      object-fit: cover;
    }

    .move-home {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    .btn-primary {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border: 1px solid $blue;
    }
  }
}
</style>
