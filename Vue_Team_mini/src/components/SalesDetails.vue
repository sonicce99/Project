<template>
  <div class="sales-searcher">
    <h1>판매 내역</h1>

    <div class="controller">
      <button class="all-sales btn-secondary btn-16" @click="fetchSales">
        전체 판매 내역
      </button>
      <div class="tags">
        <template v-for="tag in tags" :key="tag">
          <input type="checkbox" :id="tag" @click="select" />
          <div class="tag-box">
            <label class="tag" :for="tag">
              {{ tag }}
            </label>
          </div>
        </template>
      </div>
    </div>
    <div class="contents-box">
      <div class="no-sales" v-if="!salesDetails.length">
        판매 내역이 없습니다.
      </div>
      <div v-else-if="isLoading"><Loader class="loader" /></div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>
                <strong>상품 번호</strong>
              </th>
              <th>
                <strong>상품 정보</strong>
              </th>
              <th>
                <strong>구매자 정보</strong>
              </th>
              <th>
                <strong>주문일</strong>
              </th>
              <th>
                <strong>예약 여부</strong>
              </th>
              <th>
                <strong>구매 정보</strong>
              </th>
            </tr>
          </thead>
          <tbody v-show="isAll">
            <SalesList
              v-for="item in salesDetails"
              :key="item.detailId"
              :sales="item"
            />
          </tbody>
          <tbody v-show="!isAll">
            <SalesList
              v-for="item in selectedSales"
              :key="item.detailId"
              :sales="item"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SalesList from '~/components/SalesList'

export default {
  components: {
    SalesList,
  },
  data() {
    return {
      isAll: false,
      seletedTags: [],
      isLoading: false,
    }
  },
  created() {
    this.fetchSales()
  },
  computed: {
    salesDetails() {
      return this.$store.state.admin.salesDetails
    },
    selectedSales() {
      return this.$store.state.admin.selectedSales
    },
    tags() {
      return this.$store.getters['admin/salesTagSet']
    },
  },
  mounted() {
    this.fetchSales()
  },
  methods: {
    async fetchSales() {
      this.isLoading = true
      await this.$store.dispatch('admin/SHOW_SALESDETAILS')
      this.isLoading = false
      this.isAll = true
    },
    async select(e) {
      e.target.checked
        ? this.seletedTags.push(e.target.id)
        : (this.seletedTags = this.seletedTags.filter(
            (tag) => tag !== e.target.id
          ))
      if (this.seletedTags.length) {
        this.isLoading = true
        await this.$store.dispatch('admin/GET_SELECTED_SALES', this.seletedTags)
        this.isLoading = false
        this.isAll = false
      } else {
        this.isAll = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sales-searcher {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  padding-left: 3.2rem;

  h1 {
    @include text-style(32, $dark);
    width: 100%;
    font-weight: 300;
    margin-bottom: 1em;
    user-select: none;
  }

  .controller {
    .all-product {
      display: block;
      padding: 0.4rem;
    }

    .tags {
      @include flexbox(start, center);
      @include text-style(13, $primary);
      height: 4rem;
      overflow-x: auto;

      input {
        display: none;

        &:checked + .tag-box {
          background-color: $green;
          color: $white;
        }
      }

      &::-webkit-scrollbar {
        height: 10px;
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

      .tag-box {
        @include flexbox();
        flex-shrink: 0;
        height: 50%;
        margin: 0.5rem 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid $border;
        user-select: none;
        transition: background-color 200ms ease-in-out;

        &:first-of-type {
          margin-left: 0;
        }

        &:hover {
          background-color: $green;
        }

        label {
          display: block;
          padding: 0 1rem;
          cursor: pointer;
        }
      }
    }
  }

  .contents-box {
    position: relative;
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

.no-sales {
  @include text-style(24, $dark);
  width: 100%;
  font-weight: 400;
  padding: 1em;
  margin-bottom: 1em;
  user-select: none;
}
</style>
