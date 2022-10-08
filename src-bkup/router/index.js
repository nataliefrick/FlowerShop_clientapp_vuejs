import { createRouter, createWebHistory } from 'vue-router'
import StartView from "../views/StartView.vue"
import AboutView from "../views/AboutView.vue"
// import ArticleView from "../views/ArticleView.vue"
import CatalogView from "../views/CatalogView.vue"
import ItemView from "../views/ItemView.vue"
// import FormView from "../views/FormView.vue"
import UpdateView from "../views/UpdateView.vue"
import AddPlantView from "../views/AddPlantView.vue"
import EditPlantView from "../views/EditPlantView.vue"
import SeePlantView from "../views/SeePlantView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
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
      component: CatalogView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditPlantView
    },    
    {
      path: '/view/:id',
      name: 'view',
      component: SeePlantView
    },
    {
      path: '/item',
      name: 'item',
      component: ItemView
    },
    {
      path: '/add',
      name: 'add',
      component: AddPlantView
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateView
    }
  ]
})

export default router
