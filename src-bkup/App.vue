<template>
   <Header />
   <main>
       <RouterView />
    </main>
   <Footer />

</template>

<style scoped>

</style>

<script>
import { RouterLink, RouterView } from "vue-router"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import M from 'materialize-css'

export default {
    components: {
        Header,
        RouterView,
        Footer
    },
    mounted () {
        M.AutoInit()
    }

}


</script>