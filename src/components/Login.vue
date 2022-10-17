<template>

<div class="container" id="login">
    <h2 class="green-text small">Login to the site</h2>
    <div class="row">
      <div class="section col s2 m4"></div>
      <div class="section col s8 m4">
        <form @submit.prevent="loginUser()" class="col s12">
          <div class="input-field">
            <input id="email" v-model="email" type="text" class="validate">
            <label for="email">Email</label>
          </div>

          <div class="input-field">
            <input  id="password" v-model="password" type="text" class="validate">
            <label for="password">Password</label>
          </div>

          <button class="btn waves-effect waves-light right green" type="submit" name="action">Login
              <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
      <div class="section col s2 m4"></div>
    </div>
  </div>

</template>

<script>
export default {
    data() {
        return {
            email:"",
            password:"",
            errorMessage : null,
            token: localStorage.getItem('token'),
            user: null
        }
    },
    methods: {
        async loginUser() {
            // check first for content
            if(this.email.length > 2 ) {
                let userBody = {
                    email: this.email, 
                    password: this.password
                };

                // console.log(JSON.stringify(userBody));

                const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/login",  {
                    method: "POST",
                    headers: { 
                        "Accept" :  "application/json",
                        "Content-type" : "application/json" 
                    },
                    body: JSON.stringify(userBody)
                })
                // .then(res => res.json())
                // .then( data=> {
                //     console.log(token);
                // })
                // .catch(err => console.log(error));

                const data = await response.json();
                console.log(data);
                console.log(data.message);
                console.log(data.token);
                
                // empty form
                this.email = "";
                this.password = "";
                
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('recievedMessage', data.message);
                window.localStorage.setItem('user', data.user.name);
                // let token_ls = localStorage.getItem('token');
                // console.log(token_ls);

                this.$emit("loginUser"); // reloads the parent page.
                window.location.href = "/catalog";
            } 

        }
    }
}
</script>

<style scoped>

div#login {
    margin: 4em auto;
    text-align: center;
}

h2.small {
    font-size: x-large;
}

</style>