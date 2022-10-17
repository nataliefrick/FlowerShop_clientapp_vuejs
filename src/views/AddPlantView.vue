<template>
<div>
    <div class="container">
        <div class="section col s12 m6">
            <div class="card padding white">
                <span class="card-title green-text">Add a plant to the catalog</span>
                <Form @plantAdded="getPlants()"/>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.padding {
        padding: 2em;
    }
</style>


<script>
import Form from "../components/Form.vue";
export default {
    components: {
        Form
    },
    emits: ["addPlant"]
    // mounted() {
    //     this.getPlants();
    // }
}
</script>