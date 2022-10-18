<template>
<div>
    <div class="container">
        <!-- <pre>{{plant}}</pre> -->
        <div class="section col s12 m6">
            <div class="card padding white">
                <span class="card-title green-text">Edit Plant</span>
                <div class="row">
                <form @submit.prevent="updatePlant(plant, plant.id)" class="col s12">
                    <div class="row">
                        <div class="input-field col s6 left">
                            <input v-model="plant.title" id="plantname" type="text" class="validate" >
                            <label for="plantname">Name of Plant</label>
                            <div class="col s4">
                                <img :src="'/img/'+this.plant.photo_link" />
                            </div>
                            <div class="input-field col s8">
                                <input v-model="plant.photo_link" id="photo" type="text" class="validate">
                                <label for="photo">Picture Filename</label>
                            </div>
                        <div class="col s12">
                            <label for="price">Price</label>
                            <input v-model="plant.price" id="price" type="text" class="validate">
                        </div>
                    </div>

                    <div class="input-field col s6">
                        <textarea class="materialize-textarea" v-model="plant.description" id="description" rows="10"></textarea>
                        <label class="shift-right" for="description">Description</label>

                        <input v-model="plant.quantity" id="quantity" type="text" class="validate">
                    <label class="shift" for="quantity">Stock Quantity</label>
                    </div>
                </div>


                <button class="btn waves-effect waves-light right green" type="submit" name="action">Save<i class="material-icons right">save</i>
                </button>
                <!-- Message Printout -->
                <div v-if="savedMessage"><p class="green-msg">{{savedMessage}}</p><RouterLink :to="'/view/'+plant.id">
                    <button class="btn waves-effect waves-light right green" type="submit" name="action">View Changes<i class="material-icons right">pageview</i>
                    </button>
                    </RouterLink>
                </div>
            </form>
    </div>
            </div>
        </div>
    </div>
</div>
</template>



<script>  
export default {

    data() {
        return {
            plant: [],
            id: this.$route.params.id,
            savedMessage : null,
        }
    },
    emits: ["updatePlant"],
    created : async function() {
        try {
            if (localStorage.getItem('token') === null) {
                this.$router.push('/login');
            } else {
                console.log(localStorage.getItem('user'));
                console.log(localStorage.getItem('token'));
                this.getPlant(id);
            }
        }
        catch (error) {
            this.errorMessage = error;
        }
    },
    methods: {
        async getPlant(id) {
            // console.log(id);
            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants/"+this.id, {
                method: "GET",
                headers: {
                    "Accept" :  "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            });

            const data = await response.json(); // save the data in sent through the response.

            this.plant = data;
            // console.log(data);
        },
        async updatePlant(plant, id) {
            // check first for content
            if(plant.title.length > 4 ) {
                // console.log(id);
                // console.log(plant);
                let plantBody = {
                    title: plant.title, 
                    description: plant.description, 
                    price: plant.price, 
                    photo_link: plant.photo_link, 
                    quantity: plant.quantity
                };

                // console.log(JSON.stringify(plantBody));

                const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants/"+id,  {
                    method: "PUT",
                    headers: { 
                        "Accept" :  "application/json",
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem('token') 
                    },
                    body: JSON.stringify(plantBody)
                });

                const data = await response.json();

               
                this.$emit("updatePlant"); // reloads the parent page.
                //window.location.href = "/view/"+this.id;
                this.savedMessage = "Updates saved!";
            }

        }
    },
    mounted() {
        this.getPlant(this.id);
    }
}
</script>

<style scoped>
.green-msg {
    color:#4CAF50;
    padding-right: 8em;
}

p.green-msg {
    text-align: right;
    padding-right: 8em;
}

.padding {
    padding: 2em;
}

textarea#description {
    overflow-y: visible!important;
    padding: 1.2rem 0 0.8rem 0!important;
    min-height: 9rem!important;
    margin-bottom: 30px;
}
div.col.s6 {
    padding: 0 4%;
}

.input-field>label.shift-right {
    top: -5px!important;
    left: -0.8rem!important;
}

    .hide-large {
        display: none;
    }

    label {
        line-height: 0;
    }

    .input-field>label {
        top: -5px!important;
        left: 1rem!important;
    }

    input[type=text] {
        padding-top: 10px!important;
        padding-left: 15px!important;
        margin: 0px 0 30px 0!important;
    }
      

    input[type=text]:focus {
        border-bottom: 1px solid #4CAF50!important;
        box-shadow: 0 1px 0 0 #4CAF50!important;
    }

    input[type=text]:focus+label {
        color: #4CAF50!important;
    }

    label.shift {
        top: 150px!important;
        left: 2rem!important;
    }
    
    label {
        font-size: 1rem!important;
    }

    div.s4 img {
        height: 100%;
        max-height: 64px;
    }

    div.col.s6.left {
        padding: 0 4% 0 0;
    }

@media only screen and (max-width: 480px) {
    .shift-right {
        margin-left: 0;
        margin-right: 0;
    }

    div#radio {
        flex-direction: column;
        margin-top: 0;
        margin-bottom: 0;
    }
}

</style>

