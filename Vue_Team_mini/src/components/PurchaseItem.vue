<template>
  <!-- 최상위 RouterLink로 변경 가능 -->
  <tr class="purchased-item">
    <!-- 단일 제품 상세 구매 내역 이동시 필요 -->
    <td class="date">
      {{ date }}
    </td>
    <td class="title">
      {{ purchase.product.title }}
    </td>
    <td class="price">
      {{ purchase.product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" 원" }}
    </td>
    <td>
      <PurchaseDetailModal v-model="isModalShow" persistent>
        <template #activator>
          <button class="btn-secondary detail" @click="isModalShow = true">
            상세보기
          </button>
        </template>
        <template #default>
          <button
            class="btn-secondary close-modal"
            @click="isModalShow = false"
          >
            닫기 X
          </button>
          <SingleProductDetailPurchaseList :detailId="purchase.detailId" />
        </template>
      </PurchaseDetailModal>
    </td>
    <td>
      <button
        class="btn-confirm"
        @click="confirmed"
        :disabled="purchase.isCanceled"
      >
        구매확인
      </button>
    </td>
    <td>
      <button class="btn-cancel" @click="cancle" :disabled="purchase.done">
        구매취소
      </button>
    </td>
    <!-- <div>{{ purchase.done? '구매확정 됨': '구매확정 전' }}</div> -->
    <!-- <div>{{ purchase.isCanceled? '취소 됨': '취소 전' }}</div> -->
  </tr>
</template>

<script>
import SingleProductDetailPurchaseList from '~/components/SingleProductDetailPurchaseList'
import PurchaseDetailModal from '~/components/PurchaseDetailModal'

export default {
  data() {
    return {
      isModalShow: false,
    }
  },
  props: {
    purchase: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    SingleProductDetailPurchaseList,
    PurchaseDetailModal,
  },
  computed: {
    date() {
      const formatted = this.$dayjs(this.purchase.timePaid).format(
        'YYYY년 MM월 DD일 HH시 mm분'
      )
      return formatted
    },
  },
  methods: {
    async cancle() {
      this.$store.dispatch('user/CANCEL_PURCHASE', {
        detailId: this.purchase.detailId,
      })
    },
    async confirmed() {
      this.$store.dispatch('user/CONFIRM_PURCHASE', {
        detailId: this.purchase.detailId,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.purchased-item {
  td {
    padding: 1.5em;
  }
  .date {
    @include text-style(13, $dark);
  }

  .title {
    @include text-style(14, $dark);
    font-weight: 600;
    white-space: normal;
  }

  .price {
    @include text-style(13, $dark);
    font-weight: 600;
  }

  .detail {
    @include text-style(14);
    height: 36px;
  }

  .btn-confirm,
  .btn-cancel {
    @include text-style(14);
    height: 36px;
  }
}
</style>
