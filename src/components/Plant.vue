<template>
    <div class="card">
        <div class="card-image">
            <img :src="'/img/'+plant.photo_link" /><!-- works in dev -->
<!-- <img :src="'../src/assets/img/'+plant.photo_link" />works in dev -->
<!-- <img :src="'../assets/img/'+plant.photo_link" /> doesnt work -->
<!-- <img :src="'@../assets/img/'+plant.photo_link" /> doesnt work -->
<!-- <img :src="'@./assets/img/'+plant.photo_link" /> doesnt work -->
<!-- <img src="../assets/img/gallery1.jpg"> works -->
        </div>
        <span class="card-title green-text text-darken-2 flex-box-wrap">{{plant.title}}</span>
        <p class="small-text truncate">{{plant.description}}</p>
        <div class="card-content flex-box-nowrap">
          <p>Quantity: {{plant.quantity}}</p>
          <p>Price: {{plant.price}}kr</p>
        </div>
        <div class="flex-box-wrap buttons-row">
    <RouterLink :to="'/view/'+plant.id"><span class="material-icons">pageview</span></RouterLink>
    <RouterLink :to="'/edit/'+plant.id"><span class="material-icons">create</span></RouterLink>
    <button class="btn-delete" @click="$emit('deletePlant')"><span class="material-icons">delete</span></button>
 

</div>
</div>
</template>

<script>
    // <button class="green" @click="$emit('updatePlant')">Update</button>
    // <button class="green" @click="$emit('deletePlant')">Delete</button>
    // import { RouterLink } from 'vue-router'
    export default {
        props: {
            plant: Object
        }
    }
</script>

<style scoped>
.buttons-row {
    padding: 10px 0;
    background-color: #4CAF5040;
}

button.btn-delete {
    margin: 0;
    border: 0;
    padding: 0;
    color: #4CAF50;
    background-color: transparent;
}

a {
    color: #4CAF50;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}

div.card-content.flex-box-nowrap {
    padding: 0 10px!important;
}

button {
    margin: 1em;
    border: 0;
    padding: 8px 12px;
}
div.card-image{
    border-bottom: 1px solid #eee;
}

</style>
