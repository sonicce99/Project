<template>
  <div class="product-searcher">
    <h1>제품 조회</h1>
    <RouterLink
      :to="{ name: 'AddProduct' }"
      class="add-product btn-primary btn-16"
    >
      제품 추가
    </RouterLink>
    <div class="controller">
      <button class="btn-secondary btn-16" @click="getAllProducts">
        전체 제품 보기
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
      <div class="no-sales" v-if="!allProducts.length">
        제품 내역이 없습니다.
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
                <strong>상세 정보</strong>
              </th>
              <th>
                <strong>제품 수정</strong>
              </th>
            </tr>
          </thead>
          <tbody v-show="isAll">
            <AllProductsList
              v-for="product in allProducts"
              :key="product.id"
              :product="product"
            />
          </tbody>
          <tbody v-show="!isAll">
            <AllProductsList
              v-for="product in SelectedProducts"
              :key="product.id"
              :product="product"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AllProductsList from '~/components/AllProductsList'

export default {
  components: {
    AllProductsList,
  },
  data() {
    return {
      isLoading: false,
      isAll: true,
      seletedTags: [],
    }
  },
  computed: {
    allProducts() {
      return this.$store.state.admin.allProducts
    },
    SelectedProducts() {
      return this.$store.state.admin.seletedProducts
    },
    tags() {
      return this.$store.getters['admin/tagSet']
    },
  },
  created() {
    this.$store.dispatch('admin/getAllProducts')
  },
  methods: {
    async getAllProducts() {
      this.loading = true
      await this.$store.dispatch('admin/getAllProducts')
      this.loading = false
      this.isAll = true
    },
    async select(e) {
      e.target.checked
        ? this.seletedTags.push(e.target.id)
        : (this.seletedTags = this.seletedTags.filter(
            (tag) => tag !== e.target.id
          ))
      if (this.seletedTags.length) {
        this.loading = true
        await this.$store.dispatch(
          'admin/getSelectedProducts',
          this.seletedTags
        )
        this.loading = false
        this.isAll = false
      } else {
        this.isAll = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// TODO 반응형 처리
.product-searcher {
  @include column-flexbox(start, start);
  position: relative;
  height: 90vh;
  margin: 0;
  padding-left: 3.2rem;

  h1 {
    @include text-style(32, $dark);
    width: 100%;
    font-weight: 300;
    margin-bottom: 1em;
    user-select: none;
  }

  .add-product {
    @include inline-flexbox();
    position: absolute;
    top: 1.5rem;
    right: 5rem;
  }

  .controller {
    @include column-flexbox(start, start);
    width: 70vw;

    .tags {
      @include flexbox(start, center);
      @include text-style(13, $primary);
      width: 100%;
      height: 4rem;
      overflow: auto;

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

.no-sales {
  @include text-style(24, $dark);
  width: 100%;
  font-weight: 400;
  padding: 1em;
  margin-bottom: 1em;
  user-select: none;
}
</style>
