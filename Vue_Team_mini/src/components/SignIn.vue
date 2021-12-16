<template>
  <div class="form-group">
    <h1>로그인</h1>
    <form class="input-group" @submit="login">
      <label for="user-email">이메일</label>
      <input
        class="form-input"
        type="email"
        id="user-email"
        placeholder="email을 입력하세요."
        v-model="email"
        autofocus
      />
      <label for="user-password">비밀번호</label>
      <input
        class="form-input"
        type="password"
        id="user-password"
        placeholder="비밀번호을 입력하세요."
        minlength="8"
        v-model="password"
      />
      <div class="buttons">
        <input
          class="btn-primary btn-16"
          @click="login"
          type="button"
          value="로그인"
        />
        <RouterLink :to="{ name: 'SignUp' }" class="btn-secondary btn-16">
          회원가입
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/LOGIN', {
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  @include column-flexbox();
  width: 100%;
  height: 100vh;

  h1 {
    @include text-style(32, $dark);
    width: 360px;
    font-weight: 300;
    margin-bottom: 1em;
  }

  .input-group {
    label {
      @include text-style(12, $primary);
      display: block;
      width: 100%;
    }

    input {
      display: block;
      width: 360px;
      padding-left: 12px;
      margin-bottom: 12px;
      cursor: pointer;
    }

    input[type='button'] {
      width: 160px;
      margin-right: 20px;
    }
  }

  .buttons {
    @include flexbox(start, start);

    a {
      @include flexbox();
      width: 160px;
      margin-bottom: 12px;
    }
  }
}
</style>
