<template>
    <header>
<!-- navigation -->
<nav class="green" role="navigation">
    <div class="nav-wrapper container">
    <RouterLink id="logo-container" class="brand-logo" to="/">
        <img src="@/assets/logo.png" alt="plant logo">
    </RouterLink>
    <ul class="left shift-right hide-on-med-and-down">
        <li><RouterLink class="white-text" to="/catalog">Plant Catalog</RouterLink></li>
        <li><RouterLink class="white-text" to="/add">Add New</RouterLink></li>
        <li><RouterLink class="white-text" to="/about">Info</RouterLink></li>
    </ul>
    <ul class="right hide-on-med-and-down">
        <li v-if="user" class="green-text text-darken-3 loggedin">Welcome {{user}}</li>
        <li v-if="user"><a href="#" @click="$emit('logoutUser')">Logout</a></li>
        <li v-if="user ==='null'"><RouterLink class="white-text" to="/">Start</RouterLink></li>
    </ul>

    <ul id="nav-mobile" class="sidenav">
        <li v-if="user" class="green-text text-darken-3 loggedin">Welcome {{user}}</li>
        <li v-if="user"><a href="#" @click="$emit('logoutUser')">Logout</a></li>
        <li v-if="user ==='null'"><RouterLink class="green-text" to="/">Start</RouterLink></li>
        <li><RouterLink class="green-text" to="/">Start</RouterLink></li>
        <li><RouterLink class="green-text" to="/catalog">Plant Catalog</RouterLink></li>
        <li><RouterLink class="green-text" to="/add">Add New</RouterLink></li>
        <li><RouterLink class="green-text" to="/about">Info</RouterLink></li>
    </ul>
    <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons white-text">menu</i></a>
    </div>
</nav>
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

.shift-right {
    margin-left: 3em;
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
            // reloadonLogin() { this.$router.go(0);}
        }
        
        
        // ,
        // emits: ["loutoutUSer"]
        
    

    

</script>