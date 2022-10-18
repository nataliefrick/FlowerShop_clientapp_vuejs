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
    components: {
        Register
    },
    emits: ["addUser"],
    created : async function() {
        try {
            this.addUser();
        }
        catch (error) {
            this.errorMessage = error;
        }
    },
}

</script>