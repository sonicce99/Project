<template>

<div class="bank-group">
  <div class="bank-list">
      <div class="bank-connect">{{ bank.name }}</div>
      <div class="bank-connect-result">
        <span class="bank-connect-completed"
      v-if="bank.disabled">연결 완료</span>
      
      <RouterLink
      class="btn-primary"
      :to="{ name: 'RegisterAccount', 
      params: { bankname: bank.name ,
      bankcode: bank.code 
      ,accountlength: digitLength } }" v-else>
      연결
      </RouterLink>
      </div>
    </div>
</div>
  

</template>   

<script>
export default {
  props: {
    bank: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    digitLength() {
      return this.bank.digits.reduce((acc, cur) => 
      acc + cur, 0)
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.bank-group {
    @include column-flexbox();
    width: 100%;
     .bank-list {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      line-height: 2.5;
      border: 1px solid $border;
      border-left: none;
      border-right: none;
      .bank-connect {
      width: 50%;
      padding-right: 40px;
      text-align: center;
      }
      .bank-connect-result {
      @include text-style(14, $secondary);
      }
    }
    .btn-primary {
      width: 60px;
      height: 25px;
      font-size: 14px;
    }
  }

</style>
