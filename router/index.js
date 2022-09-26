import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import QueryAllCars from '../components/QueryAllCars.vue'
import CreateCar from '../components/CreateCar.vue'
import ChangeCarOwner from '../components/ChangeCarOwner'
import QueryCar from '../components/QueryCar'
import QueryCarMake from '../components/QueryCarMake'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/queryallcar',
    name: 'QueryAllCars',
    component: QueryAllCars
  },
  {
    path: '/createcar',
    name: 'CreateCar',
    component: CreateCar
  },
  {
    path: '/changecarowner',
    name: 'ChangeCarOwner',
    component: ChangeCarOwner
  },
  {
    path: '/query',
    name: 'QueryCar',
    component: QueryCar
  },
  {
    path: '/query/make',
    name: 'QueryCarMake',
    component: QueryCarMake
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
