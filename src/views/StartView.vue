<template>
    <Login />
</template>

<script>
    import Login from "../components/Login.vue";
    export default {
        components: {
            Login
        },
        emits: ["login"],
        // methods: {
        //     async login() {
        //         const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/login");
    
        //         const loginData = await response.json(); // save the data in sent through the response.
    
        //         this.plants = plantsData;
        //         }            
        // },
        // mounted() {
        //     this.login(); 
        // }
    }
</script>




<style scoped>
    .parallax-container .parallax img {
        opacity: 1!important;
        transform: translate3d(-50%, 228.52px, 0px);
    }

    .center-element {
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 60px;
    }

    @media only screen and (max-width: 600px) {
        .center-element {
            border-radius: 0;
            width: 100%;
            height: auto;
        }
    }

</style>