<template>
  <!--   New Catalog Entries Section   -->
      <div class="row">
        <h3 class="header center green-text block-font">New Catalog Entries</h3>
        <div class="container">
            <div class="section flex-box-wrap">
                <Plant v-for="plant in plants.slice(-3)" :plant="plant" :key="plant.id" />
            </div>
        </div>
      </div>

  <!--   New Articles Section   -->
      <div class="container">
        <div class="section flex-box-wrap">
            <!-- <Article v-for="article in articles.slice(-3)" :article="article" :key="article.id" /> -->
        </div>
    </div>

  <!--   Garden Inspiration Gallery  -->
 
  <div class="container margin-large">
    <div class="section">
      <h3 class="header center green-text block-font">Inspiration</h3>
      <div class="columns3">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery1.jpg">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery2.jpg">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery3.jpg">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery4.jpg">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery5.jpg">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery6.jpg">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery7.jpg">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery8.jpg">
        <img class="materialboxed responsive-img" src="@/assets/img/gallery9.jpg">
      </div>
    </div>
  </div>
</template>

<script>
    import Plant from "../components/Plant.vue";
    export default {
        data() {
            return {
                plants: []
            }
        },
        components: {
            Plant
        },
        methods: {
            async getPlants() {
                const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/plants");
    
                const plantsData = await response.json(); // save the data in sent through the response.
    
                this.plants = plantsData;
                }            
        },
        mounted() {
            this.getPlants(); 
        }
    }
</script>




<style scoped>
    .parallax-container .parallax img {
        opacity: 1!important;
        transform: translate3d(-50%, 228.52px, 0px);
    }

    .center-element {
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 60px;
    }

    @media only screen and (max-width: 600px) {
        .center-element {
            border-radius: 0;
            width: 100%;
            height: auto;
        }
    }

</style>