import axios from 'axios'

const token = sessionStorage.getItem('token')

export const axiosAuthInit = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/',
  headers: {
    'content-type': "application/json",
    apikey: 'FcKdtJs202110',
    username: "5zo"
  }
})

// 회원가입
// const obj = {
//   email: 필수,
//   password: 필수,
//   displayName: 필수,
//   profileImgBase64: 선택
// }
// axiosAuthInit.post('signup', obj)

// 로그인
// const obj = {
//   email: 필수,
//   password: 필수,
// }
// axiosAuthInit.post('login', obj)

export const axiosAuth = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/',
  headers: {
    'content-type': 'application/json',
    apikey: 'FcKdtJs202110',
    username: "5zo",
    Authorization: `Bearer ${token}`
  }
})


// 인증 확인
// axiosAuth.post('me')

// 로그아웃
// axiosAuth.post('logout')

// 사용자 정보 수정
// const obj = {
//   displayName: 선택,
//   profileImgBase64: 선택,
//   oldPassword : 함께선택,
//   newPassword : 함께선택
// }
// axiosAuth.put('user', obj)
