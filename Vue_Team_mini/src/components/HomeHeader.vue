<template>
  <header class="container">
    <RouterLink class="logo" to="/"
      ><img src="/logo.png" alt="SinbalShop Logo" />
    </RouterLink>
    <nav>
      <ul class="nav__links">
        <li>
          <RouterLink to="/"> Home </RouterLink>
        </li>
        <li v-if="!currentUser">
          <RouterLink to="/certification/signin"> 로그인 </RouterLink>
        </li>
        <li v-if="currentUser">
          <RouterLink to="/admin"> Admin </RouterLink>
        </li>
        <li v-if="currentUser">
          <RouterLink to="/mypage/purchaselist"> 마이페이지 </RouterLink>
        </li>
        <li v-if="currentUser">
          <button class="cta" @click="logOut">로그아웃</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser
    },
  },
  methods: {
    logOut() {
      sessionStorage.removeItem('token')
      this.$store.dispatch('user/logOut')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 300;
  @include flexbox(end, center);
  height: 80px;
  padding: 10px 10%;
  background-color: $primary;

  .logo {
    @include text-style(24, $blue-light);
    // position: fixed;
    // top: 0;
    // left: 240px;
    margin-right: auto;
    margin-left: 3rem;

    img {
      display: block;
      width: 80px;
    }
  }

  .nav__links {
    @include flexbox();

    li {
      a {
        padding: 20px;
        transition: all 300ms ease 0s;
        &:hover {
          color: #0088a9;
        }
      }
    }
  }

  .nav__links a,
  .cta {
    font-weight: 500;
    color: #edf0f1;
    text-decoration: none;
  }

  .cta {
    margin-left: 20px;
    padding: 9px 25px;
    background-color: $blue;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
      background-color: $blue-dark;
    }
  }
}
</style>
