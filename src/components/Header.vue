<template>
    <header>
<!-- navigation -->
<nav class="green" role="navigation">
    <div class="nav-wrapper container">
    <RouterLink id="logo-container" class="brand-logo" to="/">
        <img src="@/assets/logo.png" alt="plant logo">
    </RouterLink>
    <ul class="right hide-on-med-and-down">
        <li v-if="user" class="green-text text-darken-3 loggedin">Welcome {{user}}</li>
        <li v-if="user"><a href="#" @click="$emit('logoutUser')">Logout</a></li>
        <li v-if="user ==='null'"><RouterLink class="white-text" to="/">Start</RouterLink></li>
        <li><RouterLink class="white-text" to="/catalog">Plant Catalog</RouterLink></li>
        <li><RouterLink class="white-text" to="/add">Add New</RouterLink></li>
        <li><RouterLink class="white-text" to="/about">Info</RouterLink></li>
    </ul>

    <ul id="nav-mobile" class="sidenav">
        <li><RouterLink class="green-text" to="/">Start</RouterLink></li>
        <li><RouterLink class="green-text" to="/catalog">Plant Catalog</RouterLink></li>
        <li><RouterLink class="green-text" to="/add">Add New</RouterLink></li>
        <li><RouterLink class="green-text" to="/about">Info</RouterLink></li>
    </ul>
    <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons white-text">menu</i></a>
    </div>
</nav>

<!-- banner image -->
<div id="index-banner" class="parallax-container">

    <div class="section no-pad-bot">
    <div class="container">
        <!-- <br><br> -->
        <div class="white-bkg">
            <h2 class="header center green-text display-font">A Catalog of</h2>
        <h1 class="header center green-text block-font">Potted Plants</h1>
        </div>
        
        <!-- <br><br> -->
    </div>
    </div>
    <div class="parallax"><img src="@/assets/background3.jpg" alt="Lots of green potted plants"></div>
</div>
<!--Message Printout -->
<div v-if="receivedMessage"><p class="green">{{recievedMessage}} </p></div>
</header>
</template>


<style scoped>
.loggedin {
    padding: 0 1em;
    text-transform: uppercase;
    font-weight: bold;
}

a.green:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>

<script>
    import { RouterLink } from 'vue-router'
    export default {
        name: "Header",
        data() {
            return {
                errorMessage : null,
                token: localStorage.getItem('token'),
                receivedMessage: localStorage.getItem('receivedMessage'),
                user: localStorage.getItem('user')
            }
        }
        // ,
        // emits: ["loutoutUSer"]
        
    }

    

</script>