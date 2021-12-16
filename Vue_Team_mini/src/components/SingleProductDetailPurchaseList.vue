<template>
  <h1>단일 제품 상세 구매내역</h1>
  <div class="paid-info">
    <h2>결제 정보</h2>
    <p>결제 ID: {{ purchaseDetail.detailId }}</p>
    <p>결제 수단: {{ paidInfo.bankName }} / {{ paidInfo.accountNumber }}</p>
  </div> 
  <div class="product-info">
    <h2>제품 정보</h2> 
    <img class= "thumbnail" :src="productInfo.thumbnail" alt=""> 
    <p>제품 이름: {{ productInfo.title }} / 제품 가격: {{ productInfo.price }}</p>
  </div>
  <p>구매 확정 여부: {{ purchaseDetail.done }}</p>
  <p>구매 취소 여부: {{ purchaseDetail.isCanceled }}</p>
  <!-- <p>{{purchaseDetail.reservation}}</p> -->
  <p>결제 시간: {{ purchaseDetail.timePaid }}</p>
 
</template>
<script>
import { axiosUserProduct } from '~/utils/productApiConfig'
export default {
  data() {
    return {
      purchaseDetail: {},
      paidInfo: {},
      productInfo: {}
    }
  },
  props: {   
    detailId: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log(this.detailId)
    this.getPurchaseDetail()
  },
  methods: {    
    async getPurchaseDetail(){
      const obj = {
        detailId : this.detailId 
      }
      const { data } = await axiosUserProduct.post('transactions/detail', obj)
      console.log(data)
      this.purchaseDetail = data
      this.paidInfo = data.account
      this.productInfo = data.product      
    }
  }
}
</script>
<style lang="scss" scoped>
  .paid-info {
    margin-bottom: 20px;
  }
  .product-info {
    .thumbnail {
      width: 100px;
      height: 100px;
    }
  }
</style>