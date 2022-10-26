<template>
<Register @userAdded="getPlants()"/>
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
    }
}

</script>