import { createRouter, createWebHistory, routerKey } from 'vue-router'
import Home from './Home'
import Certification from './Certification'
import DomainAdmin from './DomainAdmin'
import MyPage from './MyPage'
import AddAccount from './AddAccount'
import RegisterAccount from './RegisterAccount'
import RequestPurchase from './RequestPurchase'
import EditProduct from './EditProduct'
import NotFound from './NotFound'
import SignIn from '~/components/SignIn'
import SignUp from '~/components/SignUp'
import AllProducts from '~/components/AllProducts'
import AddProduct from '~/components/AddProduct'
import SalesDetails from '~/components/SalesDetails'
import PurchaseList from '~/components/PurchaseList'
import MyAccount from '~/components/MyAccount'
import ChangeUserInfo from '~/components/ChangeUserInfo'
import AccountListChangeCheck from '~/components/AccountListChangeCheck'
import AdminSingleProductDetails from '~/components/AdminSingleProductDetails'
import UserSingleProductDetails from '~/components/UserSingleProductDetails'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home,
    },
    {
      name: 'RequestPurchase',
      path: '/requestpurchase/:id',
      component: RequestPurchase,
      props: true,
    },
    {
      path: '/certification',
      component: Certification,
      children: [
        {
          name: 'SignIn',
          path: 'signin',
          component: SignIn,
        },
        {
          name: 'SignUp',
          path: 'newuser',
          component: SignUp,
        },
      ],
    },
    {
      path: '/mypage',
      component: MyPage,
      props: true,
      redirect: { name: 'PurchaseList' },
      children: [
        {
          name: 'PurchaseList',
          path: 'purchaselist',
          component: PurchaseList,
        },
        {
          name: 'MyAccount',
          path: 'myaccount',
          component: MyAccount,
          children: [
            {
              name: 'AccountListChangeCheck',
              path: 'accountListChangeCheck',
              component: AccountListChangeCheck,
            },
          ],
        },
        {
          name: 'ChangeUserInfo',
          path: 'changeuserinfo',
          component: ChangeUserInfo,
          props: true,
        },
      ],
    },
    {
      name: 'AddAccount',
      path: '/addaccount',
      component: AddAccount,
    },
    {
      name: 'RegisterAccount',
      path: '/registeraccount',
      component: RegisterAccount,
    },
    {
      name: 'UserSingleProductDetails',
      path: '/usersingleProductDetails/:id',
      component: UserSingleProductDetails,
    },
    {
      path: '/admin',
      component: DomainAdmin,
      redirect: { name: 'AllProducts' },
      children: [
        {
          name: 'AllProducts',
          path: 'allproducts',
          component: AllProducts,
        },
        {
          name: 'AddProduct',
          path: 'addproduct',
          component: AddProduct,
        },
        {
          name: 'SalesDetails',
          path: 'salesdetails',
          component: SalesDetails,
        },
        {
          path: 'editproduct/:id',
          name: 'EditProduct',
          component: EditProduct,
        },
        {
          name: 'AdminSingleProductDetails',
          path: 'adminsingleProductDetails/:id',
          component: AdminSingleProductDetails,
        }
      ],
    },
    {
      name: 'NotFound',
      path: '/:notmatch(.*)',
      component: NotFound 
    }
  ]
})
