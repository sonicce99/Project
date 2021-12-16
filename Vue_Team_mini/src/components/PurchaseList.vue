<template>
  <div class="purchase">
    <h1 v-show="now === '구매'">구매 내역</h1>
    <h1 v-show="now === '확정'">구매 확정 내역</h1>
    <h1 v-show="now === '취소'">취소 내역</h1>

    <div class="select-btn">
      <button
        v-show="now !== '구매'"
        class="btn-secondary btn-16"
        @click="now = '구매'"
      >
        구매 내역
      </button>
      <button
        v-show="now !== '확정'"
        class="btn-secondary btn-16"
        @click="now = '확정'"
      >
        구매 확정 내역
      </button>
      <button
        v-show="now !== '취소'"
        class="btn-secondary btn-16"
        @click="now = '취소'"
      >
        취소 내역
      </button>
    </div>
    <div class="contents-box">
      <div v-if="!purchaseList.length">구매 신청 내역이 없습니다</div>
      <div v-else-if="isLoading"><Loader class="loader" /></div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>
                <strong>주문일</strong>
              </th>
              <th>
                <strong>상품명</strong>
              </th>
              <th>
                <strong>상품가격</strong>
              </th>
              <th>
                <strong>상세보기</strong>
              </th>
              <th>
                <strong>구매확정</strong>
              </th>
              <th>
                <strong>구매취소</strong>
              </th>
            </tr>
          </thead>

          <tbody v-show="now === '구매'">
            <PurchaseItem
              v-for="purchase in purchaseList"
              :key="purchase.id"
              :purchase="purchase"
            />
          </tbody>
          <tbody v-show="now === '확정'">
            <PurchaseItem
              v-for="purchase in doneList"
              :key="purchase.id"
              :purchase="purchase"
            />
          </tbody>
          <tbody v-show="now === '취소'">
            <PurchaseItem
              v-for="purchase in canceledList"
              :key="purchase.id"
              :purchase="purchase"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PurchaseItem from '~/components/PurchaseItem'

export default {
  components: {
    PurchaseItem,
  },
  data() {
    return {
      isLoading: false,
      now: '구매',
    }
  },
  computed: {
    purchaseList() {
      return this.$store.getters['user/purchaseOnlyRequested']
    },
    doneList() {
      return this.$store.getters['user/purchaseOnlyDone']
    },
    canceledList() {
      return this.$store.getters['user/purchaseOnlyCanceled']
    },
  },
  created() {
    this.getPurchaseList()
  },
  methods: {
    async getPurchaseList() {
      this.isLoading = true
      await this.$store.dispatch('user/getPurchaseList')
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.purchase {
  @include column-flexbox(start, start);
  height: 90vh;
  padding-left: 3.2rem;

  h1 {
    @include text-style(32, $dark);
    width: 100%;
    font-weight: 300;
    margin-bottom: 1em;
    user-select: none;
  }

  .contents-box {
    width: 70vw;
    overflow: auto;
    border: 1px solid $dark;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darken($border, 30%);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: $border;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }

    thead {
      width: 100%;
      position: sticky;
      top: 0;
    }
    .loader {
      @include pos-center();
    }
  }
}
</style>
