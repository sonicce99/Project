<template>
  <div class="request-area">
    <div class="content-wrap">
      <h1>상품 구매</h1>
        <table class="product-info" border="1">
          <th>상품 정보</th>
          <th>가격</th>
          <tr>
              <td>
                <div class="product">
                  <img class="thumbnail" :src="$route.query.thumbnail" alt="제품 썸네일">
                  <span>{{ $route.query.title }}</span>
                </div>
              </td>
              <td>
              <div>{{ $route.query.price }}원</div>
              </td>
          </tr>
      </table>    
      <div class="account-info">
        <h2>결제 계좌 선택</h2>
        <ul>
          <li class="account" :id="`bg${account.bankCode}`" v-for="account in accounts" 
            :key="account.id">
              <div class="bank-logo" :id="`bank${account.bankCode}`"></div>             
              <span class="account-number">{{ account.accountNumber }}</span>
              <span class="balance">잔액: {{ account.balance.toLocaleString('ko-KR') }} 원</span>
              <input class="select-radio" type="radio" @click="setSelectedAccount" name="account" :value="account.id">
          </li>
        </ul>
      </div>
      <div class="purchase-area">
        <button class="btn-primary btn-16 purchase-btn" @click="requestPurchase">구매 신청</button>
      </div>
    </div>
  </div>  
</template>

<script>
import { axiosAccount } from '~/utils/accountApiConfig'
import { axiosUserProduct } from '~/utils/productApiConfig'

export default {
  data() {
    return {
      accounts: [],
      selectedAccount: '',
      token : sessionStorage.getItem('token')
    }
  },
  mounted() {    
    console.log(this.$route.query.thumbnail)
    this.loginCheck()
  },
  methods: {
    loginCheck(){
      if(this.token) {
        this.getAccountInfo()  
      }else{
        if(confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')){
          this.$router.push('/certification/signin')
        }else{
          this.$router.go(-1)
        }
      }   
    },
    setSelectedAccount(e) { //selectedAccount변수에 선택한 계좌의 id를 넣는다.
      this.selectedAccount = e.target.value
    },
    async getAccountInfo() { // 서버에서 계좌 불러오기
      const { data } = await axiosAccount.get() 
      this.accounts = data.accounts  
    },
    goAfterRequestPurchase(){
        if(confirm('구매 완료 되었습니다. 나의 구매내역으로 가시겠습니까? ')){
          this.$router.push('/mypage/purchaselist')
        }else{
          this.$router.go(-1)
        }
      },    
    async requestPurchase() { //구매신청버튼 누른 후 실행될 함수. 서버에 구매할 제품id와 결제할 계좌id를 보낸다
      const obj = {
        productId : this.$route.params.id,
        accountId : this.selectedAccount
      }
      try{
        await axiosUserProduct.post('buy', obj)
        this.goAfterRequestPurchase()
      } catch(error){
        alert(error.response.data)
      }      
    }
  }
}
</script>

<style lang="scss" scoped>
  .request-area{ 
    // font-family: $font-main;
    max-width: 1200px;
    margin: 0 auto; 
    text-align: center;
    background-color: $background; 
    
    h1 {
      text-align: left;
      margin: 50px 20px;     
      @include text-style(32, $dark);
      width: 100%;
      font-weight: 300;
      user-select: none;
    }

    .content-wrap{
      padding: 20px;
      width: 100%;
      margin: 0 auto;

      .product-info { 

        th {
          height: 44px;
          padding: 4px 12px;
          font-size: 16px;
          vertical-align: middle;
          background-color: #1f2d3d;
          color: #fff;
        }

        td {
          font-size: 15px;
          font-weight: bold;
        }

        .product{
          @include flexbox(around, center);          

          .thumbnail {
            width: 120px;
            height: 110px;
            margin-bottom: 5px;
          }
        }    
      } 

    .account-info {

      h2{
        @include text-style(24, $dark);
        text-align: left;
        margin: 40px 20px;
        font-weight: 300;
      }

      ul{
        @include flexbox(around, center);
        flex-wrap: wrap;
        margin:0 auto;
        max-width: 1000px;      
        .account {
          @include flexbox(end, start);
          flex-direction: column;          
          width: 220px;              
          height: 150px; 
          border: 1px solid #bbb;
          border-radius: 5px;
          margin: 7px 0;

          .bank-logo{
          background-image: url('https://gist.githubusercontent.com/iamidlek/978eb94e4e0c941b420a01269da9a824/raw/ab75c999255f5639e92354b2c222b482f3eaf662/bankName.png');    
          background-size: 384px 1020px;
          width: 150px;
          height: 26px;
          margin-bottom: 10px;
          margin-left: 20px;
          }

          .account-number{
            flex-basis: 15%;
            padding-left: 20px;
            @include text-style(18, $white);
            text-shadow: 1px 1px 1px rgb(151, 151, 151);
          }
          .balance{
            flex-basis: 15%;
            padding-left: 20px;
            @include text-style(14, $white);
            text-shadow: .8px .8px .8px rgb(90, 90, 90);
          }       

          .select-radio{
            margin: 10px auto 10px;
            width: 20px;
            height:20px;
          }
        }
      }  
    }
    .purchase-area{
      margin-top: 100px;
      .purchase-btn{
        width: 198px;
        height: 56px;
        font-weight: bold;
      } 
    }    
  }   
}
  // 은행 로고
    #bank004 { //국민
      background-position: -18px -77px; 
    }
    #bank088 { //신한
      background-position: -18px -316px;  
    }
    #bank020 { //우리
      background-position: -17px -257px;  
    }
    #bank081 { //하나
      background-position: -206px -434px;  
    }
    #bank089 { //k뱅크
      background-position: -18px -620px;  
    }
    #bank090 { //카카오
      background-position: -213px -619px;  
    }
    #bank011 { //농협
      background-position: -18px -198px;  
    }

  //은행 배경
  #bg004 { //국민
    background-color: #776c61;
  }
    #bg088 { //신한
    background-color: #00a5e5;  
  }
    #bg020 { //우리
    background-color: #4981c9;  
  }
    #bg081 { //하나
    background-color: #5a9996;  
  }
    #bg089 { //k뱅크
    background-color: #0e015e;  
  }
    #bg090 { //카카오
    background-color: #f4db33;  
  }
    #bg011 { //농협
    background-color: #6eb35e;  
  }

</style>
