<template>
  <div class="wrapper">
    <div class="admin-tab">
      <div class="admin-info">
        <img
          :src="
            user.profileImg
              ? user.profileImg
              : 'https://via.placeholder.com/150'
          "
          alt="프로필"
        />
        <strong>{{ user.displayName }}</strong>
        <span>{{ user.email }}</span>
      </div>
      <AdminHeader />
      <RouterLink class="btn-primary btn-16" :to="{ name: 'Home' }">
        홈으로
      </RouterLink>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script>
import AdminHeader from '~/components/AdminHeader'

export default {
  components: {
    AdminHeader,
  },
  computed: {
    user() {
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

  .admin-tab {
    @include column-flexbox(start, center);
    width: 220px;
    height: 90vh;
    position: relative;
    margin-right: 50px;
    padding: 20px 0;
    border-radius: 6px;
    border: 1px solid $border;

    .admin-info {
      @include column-flexbox();
      height: 10rem;
      margin-bottom: 1rem;

      img {
        width: 3rem;
        height: 3rem;
        margin-bottom: 1rem;
        padding: 0 !important;
        border-radius: 50%;
        padding-left: 0.7rem;
        object-fit: cover;
      }

      strong {
        @include text-style(18, $dark);
        margin-bottom: 0.2rem;
      }

      span {
        @include text-style(14, $primary);
      }
    }

    a {
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

.content {
  flex-grow: 1;
}
</style>
