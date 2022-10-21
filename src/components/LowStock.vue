<template>
    <tr>
        <td class="padding-left">{{lsPlant.title}}</td>
        <td class="max-width-2">{{lsPlant.id}}</td>      
        <td class="max-width-2">{{lsPlant.quantity}}</td>      

        <td class="max-width-1"><input v-model="addQuantity" class="search" id="addStock" type="text"></td>     
        <!-- @click="$emit('addStock')"  -->
        <td class="max-width-3"><button @click="addStock()" class="btn waves-effect waves-light right green" type="submit" name="action">Add Stock
            <i class="material-icons left">add_circle_outline</i></button></td>

    </tr> 
</template>

<script>
    export default {
        data() {
            return {
                addQuantity:""
            }
        },
        // emits: ["addStock"],
        methods: {
            async addStock(addQuantity) {
                // check first for content
                if(this.addQuantity.length > 0 ) {
                    let addStockBody = {
                        title: this.lsPlant.title, 
                        description: this.lsPlant.description, 
                        price: this.lsPlant.price, 
                        photo_link: this.lsPlant.photo_link, 
                        quantity: parseInt(this.lsPlant.quantity) + parseInt(this.addQuantity)
                    };

                // console.log(JSON.stringify(addStockBody));

                const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants/addstock/"+this.lsPlant.id,  {
                        method: "PUT",
                        headers: { 
                            "Accept" :  "application/json",
                            "Content-type" : "application/json",
                            "Authorization" : "Bearer " + localStorage.getItem('token')  
                        },
                        body: JSON.stringify(addStockBody)
                    });

                    const data = await response.json();

                    // empty form
                    this.addQuantity = "";
                                    
                    this.$emit("getPlants"); // reloads the parent page.
                    window.location.href = "/catalog";
                    // this.$router.push('/catalog');
                }

            }
        },
        props: {
            lsPlant: Object
        }
    }
</script>

<style scoped>


input[type=text].search {
        border: 1px solid #9e9e9e;
        padding-left: 5px;
        width: 50px;
        text-align: center;
        margin: 0 auto;
    }

    .justify-middle {
        line-height: 45px;
    }
    input[type=text].search:focus {
        border: 1px solid #4CAF50;
    }

    .max-width-1,
    .max-width-2 {
        text-align: center;
    }

    .max-width-1 {
        width: 100px;
    }

    .max-width-2 {
        width: 100px;
    }

    .max-width-3 {
        width: 157px;
        margin-left: 0;
        margin-right: auto;
        float: left;
    }

    .padding-left {
        padding-left: 25px;
    }
    button {
        height: 44px;
    }
</style>