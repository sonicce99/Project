<template>
  <div class="form-group">
    <form @submit.prevent="register">
      <h1>{{ $route.params.bankname }} 계좌 연결</h1>
      <label for="user-account">
        계좌번호 {{$route.params.accountlength}}자리
        </label> 
      <input
        class="form-input"
        v-model="accountNumber" 
        type="text"
        placeholder="'-'없이 계좌번호를 입력하세요." />
    
      <label for="user-phone-number">전화번호</label> 
      <input 
        class="form-input"
        v-model="phoneNumber"
        type="text"
        placeholder="'-'없이 전화번호를 입력하세요." />
      
      <label for="user-signature">서명</label> 
      <input 
        class="form-input"
        v-model="signature" 
        type="text"
        placeholder="서명을 입력하세요." />

      <div class="btn-wrapper">
         <RouterLink RouterLink
          class="btn-anchor btn-16"
          :to="{ name: 'AddAccount' }">
          돌아가기
          </RouterLink>
          <button class="btn-primary btn-16" type="submit">등록하기</button>
      </div>
      
      
     
    </form>

  </div>
  
</template>

<script>
export default {
  data() {
    return {
      accountNumber: '',
      phoneNumber: '',
      signature: '',
    }
  },
  methods: {
    register() {
      this.$store.dispatch('user/register', {
        bankCode: this.$route.params.bankcode,
        accountNumber: this.accountNumber,
        phoneNumber: this.phoneNumber,
        signature: this.signature
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .form-group {
    height: 82vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

   h1 {
      text-align: center;
      font-weight: 400;
      margin-bottom: 1.5em;
      }

      label {
        @include text-style(14, $primary);
        display: block;
      }
        
      .form-input {
        display: block;
        width: 300px;
        padding-left: 10px;
        margin-bottom: 10px;
      }

      .btn-primary {
        width: 50%;
      }

      .btn-anchor {
        width: 50%;
      }

  }
   
</style>