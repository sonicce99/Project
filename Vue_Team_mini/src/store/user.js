import { axiosAuthInit, axiosAuth } from '~/utils/authenticationApiConfig'
import { axiosUserProduct, axiosPublicProduct } from '~/utils/productApiConfig'
import { axiosAccount } from '~/utils/accountApiConfig'
import router from '~/routes'

import { gucciImage } from '../utils/gucciImage'
import { valentinoImage } from '../utils/valentinoImage'
import { louboutinImage } from '../utils/louboutinImage'
import { votegaImage } from '../utils/votegaImage'
import { theRowImage } from '../utils/theRowImage'

export default {
  namespaced: true,
  state: () => ({
    purchaseList: [],
    keywordList: [
      {
        name: 'GUCCI',
        image: gucciImage,
      },
      {
        name: 'THE ROW',
        image: theRowImage,
      },
      {
        name: 'CHRISTIAN LOUBOUTIN',
        image: louboutinImage,
      },
      {
        name: 'Bottega Veneta',
        image: votegaImage,
      },
      {
        name: 'Valentino Garavani',
        image: valentinoImage,
      },
    ],
    searchResults: [],
    currentUser: null,
  }),
  getters: {
    purchaseOnlyCanceled(state) {
      return state.purchaseList.filter((purchase) => purchase.isCanceled)
    },
    purchaseOnlyDone(state) {
      return state.purchaseList.filter((purchase) => purchase.done)
    },
    purchaseOnlyRequested(state) {
      return state.purchaseList.filter((purchase) => !purchase.done && !purchase.isCanceled)
    },
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },
  actions: {
    // 로그인
    async LOGIN({}, payload) {
      const { data } = await axiosAuthInit.post('login', payload)
      // access token 유지
      await sessionStorage.setItem('token', data.accessToken)
      await router.push('/')
      router.go()
    },
    async UPDATE_USERINFO({}, payload) {
      await axiosAuth.put('user', payload)
      router.go()
    },
    // 제품 검색 결과 보기
    async SHOW_SEARCHRESULTS({ commit }, payload) {
      const { data: searchResults } = await axiosPublicProduct.post('search', payload)
      commit('assignState', { searchResults })
    },
    // 구매 확정
    async CONFIRM_PURCHASE({}, payload) {
      await axiosUserProduct.post('ok', payload)
    },
    // 구매 취소
    async CANCEL_PURCHASE({}, payload) {
      await axiosUserProduct.post('cancel', payload)
    },
    async logOut() {
      await axiosAuth.post('logout')
      router.go()
    },
    async getPurchaseList({ commit }) {
      const { data: purchaseList } = await axiosUserProduct.get('transactions/details')
      commit('assignState', { purchaseList })
    },
    async register({},payload) {
      await axiosAccount.post('',payload)
    },
    async getBankList() {
      const { data } = await axiosAccount.get('banks')
      return data
    },
    async accountRemove({},payload) {
      const { data } = await axiosAccount.delete('',payload)
      console.log(data)
      router.go()
    },
  },
}
