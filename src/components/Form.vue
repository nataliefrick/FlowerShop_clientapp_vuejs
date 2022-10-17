<template>
    <div class="row">
        <form @submit.prevent="addPlant()" class="col s12">
            <div class="row">
            <div class="input-field col s6">
                <input v-model="title" id="plantname" type="text" class="validate">
                <label for="plantname">Name of Plant</label>
            </div>

            <div class="input-field col s6">
                <input v-model="description" id="description" type="text" class="validate">
                <label for="description">Description</label>
            </div>
            </div>

            <div class="row">
                <div class="input-field col s6">
                <input v-model="photo_link" id="photo" type="text" class="validate">
                <label for="photo">Picture Filename (if available, otherwise use default)</label>
                </div>
                <div class="input-field col s6">
                <input v-model="price" id="price" type="text" class="validate">
                <label for="price">Price</label>
                </div>
                <div class="input-field col s6">
                <input v-model="quantity" id="quantity" type="text" class="validate">
                <label for="quantity">Stock Quantity</label>
                </div>
            </div>

            <button class="btn waves-effect waves-light right green" type="submit" name="action">Add
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                title:"",
                description:"",
                price:"",
                photo_link:"nographic.jpg",
                quantity:""
            }
        },
        emits: ["addPlant"],
        methods: {
            async addPlant() {
                
                // check first for content
                if(this.title.length > 4 ) {
                    let plantBody = {
                        title: this.title, 
                        description: this.description, 
                        price: this.price, 
                        photo_link: this.photo_link, 
                        quantity: this.quantity
                    };

                    console.log(JSON.stringify(plantBody));

                    const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants",  {
                        method: "POST",
                        headers: { 
                            "Accept" :  "application/json",
                            "Content-type" : "application/json" 
                        },
                        body: JSON.stringify(plantBody)
                    });

                    const data = await response.json();

                    // empty form
                    this.title = "";
                    this.description = "";
                    this.price = "";
                    this.photo_link = "";
                    this.quantity = ""; 
                    
                    this.$emit("addPlant"); // reloads the parent page.
                    window.location.href = "/catalog";
                }

            }
        }
    }
</script>

<style scoped>
    div.col.s6 {
        padding: 0 4%;
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
        }

        input[type=text]:focus {
            border-bottom: 1px solid #4CAF50!important;
            box-shadow: 0 1px 0 0 #4CAF50!important;
        }

        input[type=text]:focus+label {
            color: #4CAF50!important;
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