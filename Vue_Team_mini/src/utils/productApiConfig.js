import axios from 'axios'

const token = sessionStorage.getItem('token')

// 사용자 전용
export const axiosUserProduct = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/',
  headers: {
    'content-type': 'application/json',
    apikey: 'FcKdtJs202110',
    username: "5zo",
    authorization: `Bearer ${token}`
  }
})

// 제품 구매 신청
// const obj = {
//   productId : 필수,
//   accountId : 필수,
//   reservation : {
//     start : 선택ISO,
//     end : 선택ISO
//   }
// }
// axiosUserProduct.post('buy', obj)

// 제품 구매 취소
// axiosUserProduct.post('cancel',{ detailId })

// 제품 구매 확정
// axiosUserProduct.post('ok',{ detailId })

// 제품 전체 구매 내역
// axiosUserProduct.get('transactions/details')

// 단일 제품 상세 구매 내역
// axiosUserProduct.post('transactions/detail',{ detailId })


// 관리자 전용
export const axiosAdminProduct = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/',
  headers: {
    'content-type': 'application/json',
    apikey: 'FcKdtJs202110',
    username: "5zo",
    masterKey: true
  },
})

// 모든 제품 조회
// axiosAdminProduct.get()

// 전체 판매 내역
// axiosAdminProduct.get('transactions/all')

// 판매 내역 관리
// axiosAdminProduct.put(`transactions/${detailId}`, { isCanceled: true })

// 제품 추가
// const obj = { 
//   title : 필수,
//   price : 필수,
//   description : 필수,
//   tags : 선택,
//   thumbnailBase64 : 선택Base64,
//   photoBase64 : 선택Base64
// }
// axiosAdminProduct.post('', obj)

// 제품 수정
// const obj = { 
//   title,
//   price,
//   description,
//   tags,
//   thumbnailBase64,
//   photoBase64,
//   isSoldOut
// }
// axiosAdminProduct.put(`${productId}`, obj)

// 공용
export const axiosPublicProduct = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/',
  headers: {
    'content-type': 'application/json',
    apikey: 'FcKdtJs202110',
    username: "5zo"
  },
})

// 단일 제품 상세 조회
// axiosPublicProduct.get(`${productId}`)

// 제품 검색
// const obj = {
//   searchText: "삼성전자",
//   searchTags: ["가전"]
// }
// axiosPublicProduct.post('search', obj)
