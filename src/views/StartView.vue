<template>
    <Login />
</template>

<script>
import Login from "../components/Login.vue";
export default {
    components: {
        Login
    },
    emits: ["loggedin"]

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

    a.register {
        text-decoration: underline;
        line-height: 36px;
        }

    @media only screen and (max-width: 600px) {
        .center-element {
            border-radius: 0;
            width: 100%;
            height: auto;
        }
    }

</style>