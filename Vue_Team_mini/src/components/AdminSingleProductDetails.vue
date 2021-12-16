<template>
  <div class="wrap" v-if="ModalOpened === true">
    <h1>제품 상세 조회</h1>
    <div class="product-info">

      <img class= "photo" :src="dataObject.thumbnail" alt="제품 썸네일" />

      <div class="details">
        <p><strong>제품 아아디</strong>: {{ dataObject.id }}</p>
        <p><strong>제품명</strong>: {{ dataObject.title }}</p>
        <p><strong>제품 가격</strong>: {{ dataObject.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" 원" }}</p>
        <p><strong>제품 설명</strong>: {{ dataObject.description }}</p>
        <p><strong>제품 태그</strong>: {{ dataObject.tags.toString() }}</p>

        <!-- 재고 있는지 없는지 판별 -->
        <p v-if="dataObject.isSoldOut === false"><strong>매진 여부</strong>: 재고 있음</p>
        <p v-else><strong>매진 여부</strong>: 재고 없음</p>

        <!-- 제품 예약 관련 -->
        <div v-if="dataObject.reservations.length === 0"><strong>예약 판매 여부</strong>: 안함</div>
        <div v-else>
          <p><strong>예약 시작 시간</strong>: {{ dataObject.reservations.reservation.start }}</p>
          <p><strong>예약 종료 시간</strong>: {{ dataObject.reservations.reservation.end }}</p>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { axiosPublicProduct } from '~/utils/productApiConfig'

export default {
  mounted() {
    this.AdminSingleProductDetails()
  },
  data() {
    return {
      dataObject:{},
      ModalOpened: false
    }
  },
  methods: {
    async AdminSingleProductDetails() {
      try {
        const { data } = await axiosPublicProduct.get(`${this.$route.params.id}`)
        this.dataObject = data
        // console.log(this.dataObject)
        this.ModalOpened = true
        
      } catch (error) {
        console.log(error.response.data)
      } 
    }
  },  
}
</script>
<style lang="scss" scoped>
.wrap{
  position: relative;
  h1 {
    position: absolute;
    left: 50%;
    margin-left: -103px;
    z-index: 1;
    font-size: 35px;
  }
  .product-info {
    display: flex;
    align-items: center;
    .photo {
      width: 630px;
      height: 630px;
      margin-top: -10px;
      margin-left: 50px;
    }
    .details {
      margin-left: 10px;
      margin-top: 50px;
      line-height: 1.8;
      font-size: 14px;
      strong {
        font-size: 16px;
      }
    }
  }
}
</style>
