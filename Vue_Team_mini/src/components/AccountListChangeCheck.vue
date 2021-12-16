<template>
  <div class="wrap">
    <h1 class="name">전계좌조회</h1>
    <div class="contents-box">
      <table>
        <thead>
          <tr>
            <th>
              <strong>은행명</strong>
            </th>
            <th>
              <strong>계좌번호</strong>
            </th>
            <th>
              <strong>현재 금액</strong>
            </th>
            <th>
              <strong>계좌 해지하기</strong>
            </th>
          </tr>
        </thead>

        <tbody>
          <AccountList 
            v-for="accountInfo in accountInfos" 
            :key="accountInfo.id"
            :accountInfo="accountInfo" 
          />
        </tbody>
      </table>
    </div>
    <RouterLink
      class="btn-secondary btn-16 btn-addAccount btn-confirm"
      :to="{ name: 'AddAccount' }"
      >계좌 추가하기
    </RouterLink>
  </div>
</template>

<script>
import { axiosAccount } from '~/utils/accountApiConfig'
import AccountList from '~/components/AccountList'

export default {
  components: {
    AccountList,
  },
  mounted() {
    this.AccountListChangeCheck()
  },
  data() {
    return {
      accountInfos: []
    }
  },
  methods: {
    async AccountListChangeCheck() {
      try {
        const { data } = await axiosAccount.get()
        this.accountInfos = data.accounts

      } catch (error) {
        console.log(error.response.data)
      } 
    }
  }  
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  @include column-flexbox(start, start);
  height: 90vh;
  padding-left: 3.2rem;
  .name {
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
  }
  .btn-addAccount {
    position: absolute;
    right: 60px;
    top: 40px;
  }
}
</style>
