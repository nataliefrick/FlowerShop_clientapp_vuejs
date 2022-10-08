<template>
    <div class="card">
        <div class="card-image">
            <img :src="'src/assets/img/'+article.photo_link" />
        <span class="article card-title green white-text">{{article.title}}</span>
        </div>
        <div>
            <p class="green-text">{{article.keywords}}</p>    
        </div>
        <div class="card-action">
            <p class="small-text truncate">{{article.text}}</p>
        </div>
    </div>
</template>

<script>
    // import { RouterLink } from 'vue-router'
    export default {
        props: {
            article: Object
        }
    }
</script>
