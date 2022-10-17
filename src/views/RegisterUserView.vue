<template>

<!-- ErrorMessage Printout -->
<!-- <div v-if="errorMessage"><p class="red">{{errorMessage}} </p></div> -->

<Register @userAdded="getPlants()"/>
<!-- Message Printout -->
<!-- <div v-if="recievedMessage"><p class="green">{{recievedMessage}} </p></div> -->
</template>

<script>
import Register from "../components/Register.vue";
export default {
    // data: {
    //  recievedMessage: localStorage.getItem('recievedMessage')
    // },
    components: {
        Register
    },
    emits: ["addUser"]
}

</script>