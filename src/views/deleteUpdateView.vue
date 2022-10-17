<template>
    <Form @plantAdded="getPlants()"/>
</template>

<script>
import Form from "../components/Form.vue";
export default {
    components: {
        Form
    },
    emits: ["addPlant"],
    mounted() {
        this.getPlants();
    }
}
</script>