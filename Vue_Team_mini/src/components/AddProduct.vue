<template>
  <div class="addproduct-from">
    <form @submit.prevent="addProduct" class="input-group" name="input">
      <h1>제품 등록</h1>
      <label for="user-title">제목</label>
      <input
        class="form-input"
        v-model="title"
        type="text"
        id="user-title"
        placeholder="제목을 입력하세요."
      />
      <label for="user-price">가격</label>
      <input
        class="form-input"
        id="user-price"
        type="text"
        placeholder="가격을 입력하세요."
        v-model="price"
      />
      <label for="user-desc">설명</label>
      <input
        class="form-input"
        id="user-desc"
        type="text"
        placeholder="설명을 입력하세요."
        v-model="description"
      />
      <label for="user-tags">
        태그 <span>입력예) THE ROW,Bottega Veneta,CHRISTIAN LOUBOUTIN</span>
      </label>
      <input
        class="form-input"
        id="user-tags"
        type="text"
        placeholder="태그를 입력하세요."
        v-model="tags"
      />
      <label for="thumbnail">썸네일</label>
      <input
        class="form-input"
        type="file"
        id="thumbnail"
        @change="selectFile"
      />
      <label for="photo">상세 이미지</label>
      <input class="form-input" type="file" id="photo" @change="selectFile" />
      <div class="buttons">
        <button type="submit" class="btn-primary btn-16">제품 등록</button>
        <button class="btn-cancel btn-16" @click="back">뒤로가기</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      tags: '',
      thumbnailBase64: '',
      photoBase64: '',
    }
  },
  methods: {
    addProduct() {
      const obj = {
        title: this.title,
        price: this.price,
        description: this.description,
        tags: this.tags.split(','),
        thumbnailBase64: this.thumbnailBase64,
        photoBase64: this.photoBase64,
      }
      this.$store.dispatch('admin/addProduct', obj)
    },
    back() {
      this.$router.go(-1)
    },
    selectFile(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          if (event.target.id === 'thumbnail') {
            this.thumbnailBase64 = reader.result
          } else {
            this.photoBase64 = reader.result
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.addproduct-from {
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
    }

    input[type='file'] {
      padding-top: 10px;
      margin-bottom: 20px;
      line-height: 1.1em;
    }

    input[type='submit'] {
      width: 360px;
      margin-right: 20px;
    }

    .buttons {
      @include flexbox(between, center);

      button {
        @include flexbox();
        width: 48%;
      }
    }
  }
}
</style>

