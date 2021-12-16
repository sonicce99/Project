<template>
  <HomeHeader />
  <div class="wrap" v-if="ModalOpened === true">
    <div class="inner">
      <h1 class="name">SinbalShop</h1>

      <div class="product-info">
        <!-- dataObject.photo 로 바꾸기 -->
        <img class="photo" :src="dataObject.thumbnail" alt="제품 사진" />

        <div class="product-details">
          <h2 class="title">{{ dataObject.title }}</h2>
          <h4>{{ dataObject.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }} 원</h4>
          <p class="pay">부가가치세 별도, 배송료 별도</p>

          <!-- 구매하기 -->
          <RouterLink  :to="{ name: 'RequestPurchase', params: { id: dataObject.id }, query: {title: dataObject.title, price: dataObject.price, thumbnail: dataObject.thumbnail}}">
            <span class="btn-primary btn-16"> 구매하기 </span>
          </RouterLink>   

          <div class="coupon">
            <p>10만원 이상 주문 시 무료 배송!</p>
            <p>30만원 이상 주문 시 10% 할인 쿠폰 증정!</p>            
          </div>

          <div class="shipping">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
            <p>당일 출고!</p>
          </div>

          <p class="kacbae"><strong class="strong">13:00시</strong> 이내 주문 완료 시, 오늘 출고됩니다.</p>

          <h5 class="description">상세 설명</h5>
          <p class="content">{{ dataObject.description }}</p>

          <p class="tags"><strong class="fontsize">제품 분류</strong>: {{ dataObject.tags.toString() }}</p>

          <!-- 재고 있는지 없는지 판별 -->
          <p class="soldout" v-if="dataObject.isSoldOut === false"><strong class="fontsize">매진 여부</strong>:  재고 있음</p>
          <p class="soldout" v-else><strong class="fontsize">매진 여부</strong>:  재고 없음</p>

          <!-- 제품 예약 관련 -->
          <div class="reservation" v-if="dataObject.reservations.length === 0"><strong class="fontsize">예약 판매 여부</strong>:  안함</div>
          <div class="reservation" v-else>
            <p>예약 시작 시간: {{ dataObject.reservations.reservation.start }}</p>
            <p>예약 종료 시간: {{ dataObject.reservations.reservation.end }}</p>
          </div>
        </div>
      </div>
    </div> 
  </div>

</template>

<script>
import { axiosPublicProduct } from '~/utils/productApiConfig'
import HomeHeader from '~/components/HomeHeader'

export default {
  components: {
    HomeHeader
  },
  mounted() {
    this.SingleProductDetails()
  },
  data() {
    return {
      dataObject:{},
      ModalOpened: false
    }
  },
  methods: {
    async SingleProductDetails() {
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
  margin-top: 100px;
  .inner {
    width: 1185px;
    margin: 0 auto;
    .name {
      @include pos-center-x();
      top: -30px;
      font-size: 40px;
    }
    .product-info {
      @include flexbox(between, center);
      @include text-style(14, $primary);
      font-weight: 500;
      .photo {
        margin-left: 30px;
        margin-top: 80px;
        padding: 30px;
        width: 600px;
        height: 600px;
      }
      .product-details {
        margin-top: 120px;
        margin-left: 120px;
        .title {
          @include text-style(32, $dark);
          margin-bottom: 1rem;
        }
        h4 {
          @include text-style(24, $blue);
        }
        .pay {
          @include text-style(12, $secondary);
          margin-bottom: 20px;
        }
        .btn-primary {
          width: 38%;
          margin-bottom: 0.5em;
        }
        .coupon {
          @include text-style(14);
          :last-child {
            margin-bottom: 18px;
          }
        }
        .kacbae {
          @include text-style(14, $primary);
          margin-bottom: 25px;
        }
        .strong {
          color: #000;
        }
        .shipping {
          display: flex;
          margin-bottom: 4px;
        }
        .description {
          @include text-style(16, $dark);
          margin-bottom: 8px;
        }
        .content {
          margin-bottom: 15px;
        }
        .tags {
          margin-bottom: 4px;
        }
        .soldout {
          margin-bottom: 4px;
        }
        .reservation {
          margin-bottom: 4px;
        }
        .fontsize {
          @include text-style(14, $dark);
        }
      }
    }
  }
}

</style>
