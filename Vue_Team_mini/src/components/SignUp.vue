<template>
  <div class="form-group">
    <form
      class="input-group"
      @submit.prevent="signUp"
    >
      <h1>회원 가입</h1>
      <label for="user-email">이메일</label>
      <input
        class="form-input"
        v-model="email"
        type="email"
        id="user-email"
        placeholder="email을 입력하세요."
        autofocus
      />
      <label for="user-password">비밀번호</label>
      <input
        class="form-input"
        v-model="pw"
        type="password"
        id="user-password"
        placeholder="비밀번호을 입력하세요."
        minlength="8"
      />
      <label for="user-name">이름</label>
      <input
        class="form-input"
        v-model="displayName"
        type="text"
        id="user-name"
        placeholder="이름을 입력하세요."
      />
      <label for="user-profile-picture">프로필 사진</label>
      <input
        class="form-input"
        type="file"
        id="user-profile-picture"
        accept=".png, .jpg"
        @change="selectfile"
      >
        <input
          class="btn-primary btn-16"
          type="submit"
          value="회원가입"
        />
        </form>
        <RouterLink
          class="btn-anchor btn-16"
          :to="{ name: 'SignIn' }"
        >
          로그인
          </RouterLink>
  </div>
</template>



<script>
import { axiosAuthInit } from "~/utils/authenticationApiConfig"

export default {
  data() {
    return {
      email: "",
      pw: "",
      displayName: "",
      profileImgBase64: null
    }
  },
  methods: {
    selectfile(event) {
      // console.log(event)
      // const files= event.target.files
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("load", () => {
          this.profileImgBase64 = reader.result
        })
      }
    },
    async signUp() {
      try {
        const obj = {
          email: this.email,
          password: this.pw,
          displayName: this.displayName,
          profileImgBase64: this.profileImgBase64
        }
        await axiosAuthInit.post("signup", obj)
        // console.log(data.data)
        this.$router.push("/") //router로 메인페이지로 이동됨
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }
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

    input[type="file"] {
      padding-top: 10px;
      margin-bottom: 20px;
      line-height: 1.1em;
    }

    input[type="submit"] {
      width: 360px;
      margin-right: 20px;
    }
  }

  a {
    @include flexbox();
    position: absolute;
    top: 40px;
    left: 140px;
    width: 80px;
    margin-bottom: 12px;
  }
}
</style>
