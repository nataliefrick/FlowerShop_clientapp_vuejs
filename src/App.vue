<template>
   <Header @loggedin="forcesUpdateComponent()" @logout-user="logoutUser"/>
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
    data() {
        return {
            errorMessage : null,
            recievedMessage: null
        }
    },
    components: {
        Header,
        RouterView,
        Footer
    },
    methods: {
        async logoutUser() {
            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/logout",  {
                method: "POST",
                headers: { 
                    "Accept" :  "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                },
            })

            const data = await response.json();
            
            window.localStorage.setItem('token', "");
            window.localStorage.setItem('recievedMessage', "");
            window.localStorage.setItem('user', "");

            this.$emit("logoutUser"); // reloads the parent page.
            // window.location.href = "/login"; // this initiates a hard reload but causes broken links in netifly
            this.$router.push('/login'); // does not cause broken link but no hard reload to reset local values.
        },
        async forcesUpdateComponent() {
                // force re-render
                console.log("force rerender");
                this.$forceUpdate();
                this.$emit("loggedin");
            }

    },
    mounted () {
        M.AutoInit()
    }

}


</script>