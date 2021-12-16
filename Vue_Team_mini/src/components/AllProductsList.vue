<template>
  <tr>
    <td>
      {{ product.id }}
    </td>
    <td>
      <div class="product">
        <div class="info-box">
          <img
            :src="
              product.thumbnail
                ? product.thumbnail
                : 'https://via.placeholder.com/150'
            "
            alt=""
          />
          <div class="info">
            <div class="title">{{ product.title }}</div>
            <div class="price">{{ getPrice }} 원</div>
            <div class="tags">{{ product.tags.join(' / ') }}</div>
            <div class="soldout">
              {{ product.isSoldOut ? '재고 없음' : '재고 있음' }}
            </div>
          </div>
        </div>
      </div>
    </td>

    <td>
      <RouterLink
        class="detail btn-secondary"
        :to="{ name: 'AdminSingleProductDetails', params: { id: product.id } }"
        >상세 정보</RouterLink
      >
    </td>
    <td>
      <RouterLink
        class="edit btn-secondary"
        :to="{ name: 'EditProduct', params: { id: product.id } }"
        >제품 수정</RouterLink
      >
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getPrice() {
      return this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style lang="scss" scoped>
.product {
  @include flexbox();

  .info-box {
    @include flexbox(start, center);

    img {
      width: 90px;
      margin-right: 60px;
    }

    .info {
      padding-left: 1rem;

      .title {
        @include text-style(14, $dark);
        margin-bottom: 0.5rem;
        font-weight: 600;
        white-space: normal;
      }

      .price {
        @include text-style(12, $dark);
        margin-bottom: 1rem;
        font-weight: 600;
      }

      .tags {
        margin-bottom: 0.4rem;
        padding: 4px;
        border: 1px solid $border;
        border-radius: 6px;
      }

      .soldout {
        font-weight: 700;
      }
    }
  }
}

.btn-secondary {
  @include text-style(14);
  height: 36px;
}
</style>
