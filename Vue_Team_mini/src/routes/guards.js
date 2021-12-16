import { axiosAuth } from '../utils/authenticationApiConfig.js'
import router from './index'
import store from '~/store'

const token = sessionStorage.getItem('token')

router.beforeEach(async () => {
  if (token) {
    try {
      const { data } = await axiosAuth.post('me')
      store.commit('user/assignState', {
        currentUser: data
      })
    } catch(e) {
      console.log(e.response.data)
    }
  }
})
