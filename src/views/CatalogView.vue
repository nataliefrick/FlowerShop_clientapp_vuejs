<template>
    <div class="container">
        <div class="section">
            <h4 class="green-text lighten-2">Plant Catalog 
                <RouterLink class="waves-effect waves-light btn-small green white-text" to="/add"><i class="material-icons left">add_circle_outline</i>New</RouterLink>
            </h4>
            <p class="light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo reprehenderit atque obcaecati, saepe reiciendis quos neque consequatur accusamus inventore ab ad.</p>
            <!-- ErrorMessage Printout -->
            <div v-if="errorMessage"><p class="red">{{errorMessage}} </p></div>
            <form>
                <div class="row">
                    <div class="col search">
                        <input type="text" v-model="input" class="search" placeholder="Search">
                    </div>
                    <div class="col">
                        <button class="btn-large waves-effect waves-light right green white-text" type="submit" name="action"><span class="material-icons justify-middle">search</span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="container">
        <div class="section flex-box-wrap">
            <!-- <Plant @deletePlant="deletePlant(plant.id)" @updatePlant="updatePlant(plant.id)" v-for="plant in filteredList(input)" :plant="plant" :key="plant.id" />
            <div class="item error" v-if="input&&!filteredList().length">
                <p>No results found!</p>
            </div> -->
            <Plant @deletePlant="deletePlant(plant.id)" @updatePlant="updatePlant(plant.id)" v-for="plant in plants" :plant="plant" :key="plant.id" />
        </div>
    </div>
</template>

<style scoped>
    input[type=text].search {
        border: 1px solid #9e9e9e;
        padding-left: 5px;
    }
    
    .justify-middle {
        line-height: 45px;
    }
    input[type=text].search:focus {
        border: 1px solid #4CAF50;
    }

    .col.search {
        padding-left: 0;
    }

    .btn-large {
        height: 45px;
        line-height: 45px;
    }

    .hover-green:hover {
        background-color: #4CAF50;
        color: white;
    }

</style>



<script>
import Plant from "../components/Plant.vue";
export default {
    data() {
        return {
            plants: [],
            errorMessage : null,
            input : null,
            token: localStorage.getItem('token')
        }
    },
    created : async function() {
        try {
            if (localStorage.getItem('token') === null) {
                this.$router.push('/login');
            } else {
                console.log(localStorage.getItem('user'));
                console.log(localStorage.getItem('token'));
                // this.forcesUpdateComponent();
                this.getPlants();
            }
        }
        catch (error) {
            this.errorMessage = error;
        }
    },
    components: {
        Plant
    },
    methods: {
        // async filteredList(input) {
        //     return this.plants.filter((plant) =>
        //     plant.toString().toLowerCase().includes(input.value.toLowerCase())
        //     );
        // },
        async getPlants() {
            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants", {
                method: "GET",
                headers: {
                    "Accept" :  "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            });

            const data = await response.json(); // save the data in sent through the response.

            this.plants = data;
        },
        async deletePlant(id) {
            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants/" + id, {
                method: "DELETE",
                headers: { 
                    "Accept" :  "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            });
            const data = await response.json;

            this.getPlants();
        },
        async updatePlant(id) {
            window.location.href = "/update/"+id;
        },
        async forcesUpdateComponent() {
                // force re-render
                console.log("force rerender");
                this.$forceUpdate(0);
                this.$emit("loggedin");
            }
    },
    mounted() {
        this.getPlants();
    }
}
</script>

<!-- https://www.youtube.com/watch?v=_5Tw_oI9kKg -->