<template>

  <div class="wrapper">
    <h1>계좌 간편 연결</h1>
    <BanklistItem
      v-for="bank in banklist"
      :key="bank.code"
      :bank="bank"   />
    <RouterLink
      class="btn-list btn-anchor btn-16"
      :to="{ name: 'MyAccount' }"
    >
    내 계좌 확인
    </RouterLink>
  </div>

</template>

<script>
import BanklistItem from '~/components/BanklistItem'

export default {
  components: {
    BanklistItem    
  },
  data() {
    return {
      banklist: []
    }
  },
  created() {
    this.getBankList()
  },
  methods: {
    async getBankList() {
      const  data = await this.$store.dispatch('user/getBankList')
      this.banklist = data
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 82vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.2em;
  }
  .btn-list {
    margin-top: 1rem;
    width: 42vh;
  }
}
</style>