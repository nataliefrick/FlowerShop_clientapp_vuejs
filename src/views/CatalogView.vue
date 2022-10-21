<template>
    <div class="container">
        <!-- Low Stock Section -->
        <div class="section" id="lowStock" v-if="lowstock">
            <h4 class="red-text lighten-2">Low Stock Items</h4>
            <p class="light">The below items are running low on stock. There are less than 10 items in stock. Please reorder!</p>
            <table class="striped highlight overflow-auto">
                <thead>
                    <tr>
                        <th class="red-text lighten-2 padding-left">Plant</th>
                        <th class="red-text lighten-2 centered">ArticleNr</th>
                        <th class="red-text lighten-2 centered">Stock</th>
                    </tr>
                </thead>
                <!-- @addStock="addStock(addQuantity)" -->
                <tbody>
                    <LowStock @addStock="addStock(lsPlant)"  v-for="lsPlant in lsPlants" :lsPlant="lsPlant" :key="lsPlant.id" />
                </tbody>
            </table>
        </div>

        <!-- Catalog Header section  -->
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

        <!-- Catalog Body section  -->
        <div class="section flex-box-wrap">
            <Plant @deletePlant="deletePlant(plant.id)" @updatePlant="updatePlant(plant.id)" v-for="plant in plants" :plant="plant" :key="plant.id" />

            <!-- ErrorMessage Printout -->
            <div v-if="errorMessage"><p class="errormsg green-text">{{errorMessage}} </p></div>
        </div>
    </div>
</template>

<style scoped>
.centered {
    text-align: center;
}

.padding-left {
    padding-left: 25px;
}
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
import LowStock from "../components/LowStock.vue";
export default {
    data() {
        return {
            lsPlants: [],
            lowstock: false,
            plants: [],
            errorMessage : null,
            searchTerm : "",
            addQuantity: 0,
            token: localStorage.getItem('token'),
            urlGet: "https://arcane-hamlet-64136.herokuapp.com/api/plants"
        }
    },
    created : async function() {
        try {
            if (localStorage.getItem('token') === null) {
                this.$router.push('/login');
            } else {
                // console.log(localStorage.getItem('user'));
                // console.log(localStorage.getItem('token'));
                this.getPlants();
                this.getLowStock();
            }
        }
        catch (error) {
            this.errorMessage = error;
        }
    },
    emits: ["addStock", "getLowStock"],
    components: {
        Plant,
        LowStock
    },
    methods: {
        async addStock(plant, addQuantity) {
            console.log("catalogview");
            console.log(plant);
            console.log(this.addQuantity);
        },
        async getLowStock(){
            let quantity = 10;
            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants/lowstock/"+ quantity, {
                method: "GET",
                headers: {
                    "Accept" :  "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            });

            const data = await response.json(); // save the data in sent through the response.

            this.lsPlants = data;

            if (data.length>0) {
                this.lowstock = true;
                this.$emit("getLowStock");
            }

        },
        async filteredList() {
            this.errorMessage = "";
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
        this.getLowStock();
    }
}
</script>

<!-- https://www.youtube.com/watch?v=_5Tw_oI9kKg -->