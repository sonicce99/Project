import axios from 'axios'

const token = sessionStorage.getItem('token')

export const axiosAccount = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/',
  headers: {
    'content-type': 'application/json',
    apikey: 'FcKdtJs202110',
    username: "5zo",
    authorization: `Bearer ${token}`
  }
})

// 선택 가능한 은행 목록 조회
// axiosAccount.get('banks')


// 계좌 목록 및 잔액 조회
// axiosAccount.get()

// 계좌 연결
// const obj = {
//   bankCode: 필수,
//   accountNumber: 필수,
//   phoneNumber: 필수,
//   signature: 필수
// }
// axiosAccount.post('', obj)

// 계좌 해지
// const obj = {
//   accountId: 필수,
//   signature: 필수
// }
// axiosAccount.delete('', obj)
