<template>
  <tr>
    <td>
      {{ sales.detailId }}
    </td>

    <td>
      <div class="product">
        <div class="info">
          <div class="title">{{ sales.product.title }}</div>
          <div class="price">{{ getPrice }} 원</div>
          <div class="tags">{{ sales.product.tags.join(' / ') }}</div>
        </div>
      </div>
    </td>

    <td>
      <div class="user">
        <div class="info">
          <div class="name">{{ sales.user.displayName }}</div>
          <div class="email">{{ sales.user.email }}</div>
        </div>
      </div>
    </td>

    <td>
      <div class="time-paid">{{ day }}</div>
    </td>
    <td>
      <div class="reservation">{{ sales.reservation || '예약 안함' }}</div>
    </td>
    <td>
      <div class="purchase">
        <div class="cancel" v-if="sales.isCanceled">구매취소</div>
        <div class="done" v-if="sales.done">구매확정</div>
        <div v-else-if="!sales.isCanceled && !sales.done">구매신청상태</div>
      </div>
    </td>
  </tr>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    sales: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    day() {
      return dayjs(this.sales.timePaid).format('YYYY년 MM월 DD일 HH시 mm분')
    },
    getPrice() {
      return this.sales.product.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style lang="scss" scoped>
.user,
.product {
  @include flexbox();
  padding: 1rem 0;

  .info {
    @include column-flexbox();
  }
}

.product {
  .title {
    @include text-style(14, $dark);
    margin-bottom: 0.5rem;
    font-weight: 600;
    white-space: normal;
  }

  .price {
    @include text-style(12, $dark);
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .tags {
    padding: 4px;
    border: 1px solid $border;
    border-radius: 6px;
  }
}

.user {
  .name {
    @include text-style(14, $dark);
    margin-bottom: 2px;
    font-weight: 600;
  }

  .email {
    font-weight: 500;
  }
}

.purchase {
  font-weight: 400;

  .cancel,
  .done {
    @include text-style(14);
    font-weight: 700;
  }
  .cancel {
    color: $red;
  }
  .done {
    color: $blue;
  }
}
</style>
