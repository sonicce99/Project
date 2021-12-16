<template>
  <tr>
    <!-- 은행명 -->
    <td class="bankName">
      {{ accountInfo.bankName }}
    </td>
    <!-- 계좌번호 -->
    <td class="font">
      {{ accountInfo.accountNumber }}
    </td>
    <!-- 현재 잔액 -->
    <td class="font">
      {{ accountInfo.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" 원" }}
    </td>
    <td>
      <AccountRemove v-model="isModalShow" persistent>
        <template v-slot:activator>
          <button class="btn-cancel" @click="isModalShow = true">
            해지하기
          </button>
        </template>

        <template v-slot: default class="modal">
          <fieldset>
            <legend class="title">해당 계좌 정보</legend>
            <div class="info">
              <p>은행명: {{ accountInfo.bankName }}</p>
              <p>계좌번호: {{ accountInfo.accountNumber }}</p>
              <p>남은 잔액: {{ accountInfo.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" 원" }}</p>
            </div>
            <div class="check">
              <h2 class="comment">정말 해지하시겠습니까?</h2>
              <p>이 동작은 되돌릴 수 없습니다.</p>
            </div>
            <div class="button">
              <button
                class="btn-confirm font"
                @click="isModalShow = false"
              >
                뒤로가기
              </button>
              <button
                class="btn-cancel font"
                @click="[isModalShow = false, removeAccount()]"
              >
                해지하기
              </button>
            </div>
          </fieldset>
        </template>
      </AccountRemove>      
    </td>    
  </tr>
</template>

<script>
import AccountRemove from '~/components/AccountRemove'
export default {
  components: {
    AccountRemove
  },
  props: {
    accountInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isModalShow: false
    }
  },
  methods: {
    removeAccount() {
      const obj = {
        accountId: this.accountInfo.id,
        signature: true
      }
      this.$store.dispatch('user/accountRemove',{data: obj})
    }
  }
}
</script>

<style lang="scss" scoped>
  .bankName {
    @include text-style(14, $dark);
    font-weight: 600;
    white-space: normal;
  }
  .font {
    @include text-style(13, $dark);
  }
  .btn-cancel {
    @include text-style(14);
    height: 36px;
  }
  fieldset {
    border: 2px solid black;
    border-radius: 7px;
  }
  .modal {
    .title {
      font-weight: 700;
      font-size: 20px;
    }
    .info {
      p {
        margin-bottom: 13px;
        font-weight: 500;
        text-align: center;
        &:first-child {
          margin-top: 20px;
        }
        &:last-child {
          margin-bottom: 40px;
        }
      }
    }
    .check {
      text-align: center;
      p {
        margin-bottom: 20px;
      }
    }
    .button {
      display: flex;
      justify-content: space-around;
    }
  }
</style>