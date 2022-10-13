<template>
    <!-- <pre>{{this.plant}}</pre> -->

    <div class="container">
        <div class="section">
            <div class="card nohover">
                <div class="row">
                    <div class="col s8">
                        <h4 class="green-text lighten-2">{{this.plant.title}}</h4>
                        <p class="light">{{this.plant.description}}</p>
                        <p class="plant-details">Quantity in stock: {{this.plant.quantity}}<br>
                        Price: {{this.plant.price}}kr</p>
                    </div>
                    <div class="col s4">
                        <img :src="'/img/'+this.plant.photo_link" />
                    </div>
                </div>
            </div>
            <div>
                <RouterLink class="waves-effect waves-light btn green white-text e-margins" to="/catalog"><i class="material-icons left">arrow_back</i>Catalog</RouterLink>

                <RouterLink class="waves-effect waves-light btn green white-text e-margins" :to="'/edit/'+this.plant.id"><span class="material-icons extra-space left">create</span>Edit</RouterLink>

                <button class="waves-effect waves-light btn green white-text e-margins" @click="deletePlant(this.plant.id)"><span class="material-icons extra-space left">delete</span>Delete</button>
            </div>
        </div>     
    </div>
          

</template>

<script>
export default {
    data: function() {
        return {
            plant: [],
            id : this.$route.params.id
        }
    },
    props: {
        plant: Object
    },
    methods: {
        async getPlant(id) {
            console.log(this.id);
            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants/"+this.id);

            const data = await response.json(); // save the data in sent through the response.

            this.plant = data;
            console.log(data);
        },
        async deletePlant(id) {
            console.log(id);
            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants/"+this.id, {
                method: "DELETE",
                headers: { 
                    "Accept" :  "application/json",
                    "Content-type" : "application/json" 
                }
            });
            // const data = await response.json;

            window.location.href = "/catalog";
        }
    },
    mounted() {
        this.getPlant(this.id);
    }
}
</script>

<style scoped>
    a {
        line-height:32.4px
    }

    .row .col {
        padding: 1.75rem
    }

    span.material-icons {
        padding: 5px 0;
    }

    .e-margins {
        margin: 0 10px;
    }
    p.plant-details{
        font-size: smaller;
        font-style: italic;
    }

    div.s4 img {
        width: 100%;
    }

    .extra-space {
        margin-right: 15px;
    }
</style>