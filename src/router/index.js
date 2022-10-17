import { createRouter, createWebHistory } from 'vue-router'
import StartView from "../views/StartView.vue"
import AboutView from "../views/AboutView.vue"
// import ArticleView from "../views/ArticleView.vue"
import CatalogView from "../views/CatalogView.vue"
import ItemView from "../views/deleteItemView.vue"
// import FormView from "../views/FormView.vue"
import UpdateView from "../views/deleteUpdateView.vue"
import AddPlantView from "../views/AddPlantView.vue"
import EditPlantView from "../views/EditPlantView.vue"
import SeePlantView from "../views/SeePlantView.vue"
import RegisterUserView from "../views/RegisterUserView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'start',
      component: StartView
    },
    {
      path: '/login',
      name: 'login',
      component: StartView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditPlantView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },    
    {
      path: '/view/:id',
      name: 'view',
      component: SeePlantView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/add',
      name: 'add',
      component: AddPlantView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUserView
    }
  ]
})

export default router
