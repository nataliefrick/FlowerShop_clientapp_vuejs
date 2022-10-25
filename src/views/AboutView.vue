<template>
    <div class="container">
        <div class="section col s12">
            <div class="card padding white nohover">
                <span class="card-title green-text">Website tools</span>
                <p>This website was built on the following tools.</p>
                <ul>
                    <Tool v-for="tool in tools" :tool="tool" :key="tool.id" />
                </ul>
            </div>
        </div>
    </div>

</template>

<style scoped>
div.card.padding {
    padding: 2em;
}

/* span.italics {
    font-style: italic;
}

span.bold {
    font-weight: bold;
} */

ul {
    padding-left: 2em!important;
}
</style>

<script>
import Tool from "../components/Tool.vue";
export default {
    data() {
        return {
            tools: [],
            errorMessage : null,
            urlGet: "https://arcane-hamlet-64136.herokuapp.com/api/about"
        }
    },
    components: {
        Tool
    },
    methods: {
        async getToolList() {
            // console.log("getPlants" + urlGet);
            const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/about", {
                method: "GET",
                headers: {
                    "Accept" :  "application/json",
                    "Content-type" : "application/json",
                }
            });

            const data = await response.json(); // save the data in sent through the response.

            this.tools = data;
        }
    },
    mounted() {
        this.getToolList();
    }
}
</script>


<!-- 

"title" : "Frontend deployment",
"content" : "Netifly"

"title" : "Frontend frameword",
"content" : "Vue.js"

"title" : "Frontend styling framework",
"content" : "MaterializeCSS"

"title" : "Backend deployment",
"content" : "Heruko"

"title" : "Backend framework",
"content" : "Laravel"

 -->

