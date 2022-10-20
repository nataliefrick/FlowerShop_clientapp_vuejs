<template>
    <div class="container">
        <div class="section">
            <h4 class="green-text lighten-2">Plant Catalog
                <RouterLink class="waves-effect waves-light btn-small green white-text" to="/add"><i class="material-icons left">add_circle_outline</i>New</RouterLink>
            </h4>
            <p class="light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo reprehenderit atque obcaecati, saepe reiciendis quos neque consequatur accusamus inventore ab ad.</p>
            <!-- ErrorMessage Printout -->
            <!-- <div v-if="errorMessage"><p class="red">{{errorMessage}} </p></div> -->
            <form>
                <div class="row">
                    <form @submit.prevent="filteredList()">
                    <div class="col search">
                        <input type="text" v-model="searchTerm" class="search" placeholder="Search">
                    </div>
                    <div class="col">
                        <button class="btn-large waves-effect waves-light right green white-text" type="submit" name="action" @click="$emit('filteredList')"><span class="material-icons justify-middle">search</span></button>
                    </div>
                    </form>
                </div>
            </form>
        </div>
    </div>

    <div class="container">
        <div class="section flex-box-wrap">
            <Plant @deletePlant="deletePlant(plant.id)" @updatePlant="updatePlant(plant.id)" v-for="plant in plants" :plant="plant" :key="plant.id" />

            <!-- ErrorMessage Printout -->
            <div v-if="errorMessage"><p class="errormsg green-text">{{errorMessage}} </p></div>
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

    .errormsg {
        text-align: center;
        font-style: italic;
    }

</style>

<!-- https://bobbyhadz.com/blog/javascript-get-response-status-code-fetch -->
<!-- https://michaelnthiessen.com/force-re-render/ -->
<script>
import Plant from "../components/Plant.vue";
export default {
    data() {
        return {
            plants: [],
            errorMessage : null,
            searchTerm : "",
            token: localStorage.getItem('token'),
            urlGet: "https://arcane-hamlet-64136.herokuapp.com/api/plants"
        }
    },
    created : async function() {
        try {
            if (localStorage.getItem('token') === null) {
                this.$router.push('/login');
            } else {
                console.log(localStorage.getItem('user'));
                console.log(localStorage.getItem('token'));
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
    // emits: ["filtered-list"],
    methods: {
        async filteredList() {
            this.errorMessage = "";
            // if(this.searchTerm = "") { this.getPlants(); } 
            // else {
            // console.log(this.searchTerm);

            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants/search/" + this.searchTerm, {
                method: "GET",
                headers: {
                    "Accept" :  "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            });

            const data = await response.json(); // save the data in sent through the response.
            if(data.length===0) {
                this.errorMessage = "No results found!";
            } 
            this.plants = data;
            
            // empty form
            // this.searchTerm = "";
            // this.$emit("fileredList"); // reloads the parent page.
            
        },
        async getPlants() {
            // console.log("getPlants" + urlGet);
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