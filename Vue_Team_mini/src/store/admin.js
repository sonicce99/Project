import { axiosAdminProduct } from '~/utils/productApiConfig'

export default {
  namespaced: true,
  state: () => ({
    allProducts: [],
    seletedProducts: [],
    salesDetails: [],
    selectedSales: []
  }),
  getters: {
    // 제품의 전체 태그 보여주기
    tagSet(state) {
      const tagsRaw = []
      state.allProducts.forEach(data => {
        tagsRaw.push(...data.tags)
      })
      return [... new Set(tagsRaw)]
    },
    salesTagSet(state) {
      const tagsRaw = []
      state.salesDetails.forEach(data => {
        tagsRaw.push(...data.product.tags)
      })
      return [... new Set(tagsRaw)]
    },
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    addState(state, payload) {
      state.allProducts.push(payload)
    },
  },
  actions: {
    // 받아온 salesDetails를 활용하여 판매 내역 보기
    async SHOW_SALESDETAILS({ commit }) {
      const { data } = await axiosAdminProduct.get('transactions/all')
      commit('assignState', { salesDetails: data })
    },
    async GET_SELECTED_SALES({ commit }, tags = []) {
      const { data } = await axiosAdminProduct.get('transactions/all')
      const selectedSales = data.filter(item => item.product.tags.filter(tag => tags.includes(tag)).length)
      commit('assignState', { selectedSales })
    },
    async getAllProducts({ commit }) {
      const { data } = await axiosAdminProduct.get()
      commit('assignState', { allProducts: data })
    },
    async getSelectedProducts({ commit }, tags = []) {
      const { data } = await axiosAdminProduct.get()
      const seletedProducts = data.filter(item => item.tags.filter(tag => tags.includes(tag)).length)
      commit('assignState', { seletedProducts })
    },
    async addProduct({ commit }, obj) {
      const { data } = await axiosAdminProduct.post('', obj)
      commit('addState', data)
    },
  }
}
