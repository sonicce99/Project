<template>
  <div class="product-edit">
    <h1>상품 수정</h1>
    <form class="edit-form">
      <div>
        <label for="title">상품 이름: </label>
        <input class="form-input" type="text" id="title" name="title" v-model="title">
      </div>
      <div>
        <label for="price">상품 가격: </label>
        <!-- vmodel.number는 사용자 입력이 숫자로 형변환 된다. -->
        <input class="form-input" type="text" id="price" name="price" v-model.number="price">        
      </div>
      <div>
        <label for="description">상품 설명: </label>
        <textarea class="form-input" id="description" name="description" v-model="description"/>      
      </div>
      <div>
        <label> 재고 여부: </label>
        <label for="soldout">매진</label>
        <input type="radio" id="soldout" v-model="isSoldOut" :value="true">
        <label for="instock">재고 있음</label>
        <input type="radio" id="instock" v-model="isSoldOut" :value="false">
      </div>
      <div>
        <label for="tags">상품 태그: </label>
        <input class="form-input" type="text" id="tags" name="tags" v-model="tags" placeholder="태그가 여러 개일 경우 띄어쓰기로 구분해주세요.">
      </div>
      <div>
        <label for="thumbnail">상품 썸네일: </label>
        <div> <img class="thumb-view" :src="thumbnail" alt="thumbnail"></div>
        <input type="file" id="thumbnail" @change="selectFile">
      </div>
      <div>
        <label for="photo">상품 상세사진: </label>
        <div> <img class="photo-view" :src="photo" alt="photo"></div>
        <input type="file" id="photo" @change="selectFile">
      </div> 
    </form>
    <div class="edit-confirm">
        <button class="btn-primary btn-16 edit-btn" @click.prevent="editProduct">수정완료</button>      
    </div>        
  </div>
</template>

<script>
import { axiosAdminProduct, axiosPublicProduct } from '~/utils/productApiConfig'

export default {
  data(){
    return{
      productData: {},
      title: '',
      price: '',
      description: '',
      thumbnail: null,
      thumbnailBase64: null,
      photo: null,
      photoBase64: null,
      isSoldOut: false,
      tags: []
    } 
  },
    mounted(){
    this.getCurProduct()
    },
    methods: {
      // 서버에서 수정할 제품 정보 GET
      async getCurProduct(){ 
        const { data } = await axiosPublicProduct.get(this.$route.params.id)
        this.title = data.title
        this.price = data.price
        this.description = data.description
        this.tags = data.tags.join(',')
        this.thumbnail = data.thumbnail
        this.photo = data.photo
        this.isSoldOut = data.isSoldOut
      },
      //서버에 수정사항 PUT
      async editProduct(){
        await axiosAdminProduct.put(this.$route.params.id, {
          title : this.title,
          price : this.price,
          description: this.description,
          tags: this.tags.split(','),
          thumbnailBase64: this.thumbnailBase64,
          photoBase64: this.photoBase64,
          isSoldOut: this.isSoldOut
        })
        this.getCurProduct()
        alert('수정완료 되었습니다.')
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
          }
        )
      }
    }
  }    
}
</script>
<style lang="scss" scoped>

.product-edit{
    max-width: 1200px;
    min-width: 600px;
    height: 90vh;
    overflow: scroll !important;
  
    h1 {
      text-align: left;     
      @include text-style(32, $dark);
      font-weight: 300;
      user-select: none;
    }
    .edit-form{
      width: 100%;
      padding: 20px;

      label {
      @include text-style(16, $primary);      
      }

      input {
        display: block;
        width: 360px;
        padding-left: 12px;
        margin-bottom: 15px;
        display: inline-block;
        background-color: $white;
      }
      input[type='radio'] {
        width:30px;
        display: inline;
      }
      textarea{
        width: 380px;
        min-height:100px;
        margin-left: 65px;
        margin-bottom: 15px;
        background-color: $white;
      }
      .thumb-view {
      width: 100px;
      height: 100px;
      }
      .photo-view {
        width: 200px;
        height: 250px;
      }
    }
    .edit-confirm{
      position: relative;
      .edit-btn {
        width: 100px;
        position: absolute;
        right: 100px;
        

      }
    }
  }
  </style>
