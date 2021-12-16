<template>
  <div class="form-group">
    <form class="input-group" @submit.prevent="updateInfo">
      <h1>개인 정보 수정</h1>
      <label for="user-name">이름</label>
      <input
        class="form-input"
        v-model="displayName"
        type="text"
        id="user-name"
        :placeholder="$route.query.name"
      />
      <label for="user-profile-picture">프로필 사진</label>
      <input
        class="form-input"
        type="file"
        id="user-profile-picture"
        accept=".png, .jpg"
        @change="selectFile"
      />
      <label for="old-password">기존 비밀번호</label>
      <input
        class="form-input"
        v-model="oldPassword"
        type="password"
        id="old-password"
        placeholder="기존 비밀번호을 입력하세요."
        minlength="8"
      />
      <label for="new-password">새 비밀번호</label>
      <input
        class="form-input"
        v-model="newPassword"
        type="password"
        id="new-password"
        placeholder="새 비밀번호을 입력하세요."
        minlength="8"
      />

      <input
        @click="updateInfo"
        class="btn-primary btn-16"
        type="button"
        value="정보 수정"
      />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayName: '',
      oldPassword: '',
      newPassword: '',
      profileImgBase64: '',
    }
  },
  methods: {
    async updateInfo() {
      await this.$store.dispatch('user/UPDATE_USERINFO', {
        displayName: this.displayName,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        profileImgBase64: this.profileImgBase64,
      })
    },
    selectFile(event) {
      const { files } = event.target 
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file) 
        reader.addEventListener('load', () => {          
          this.profileImgBase64 = reader.result
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  @include column-flexbox();
  width: 100%;

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
    }

    input[type='file'] {
      padding-top: 10px;
      margin-bottom: 20px;
      line-height: 1.1em;
    }

    input[type='button'] {
      width: 360px;
      margin-right: 20px;
      cursor: pointer;
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
