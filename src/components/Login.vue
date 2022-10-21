<template>

<div class="container" id="login">
    <h2 class="green-text small">Login to the site</h2>
    <div class="row">

      <div class="section col s2 m4"></div>

      <div class="section col s8 m4 centered">
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
          <RouterLink class="green-text register" to="/register">Register an account</RouterLink>
        </form>
        <!-- ErrorMessage Printout -->
        <div v-if="recievedMessage"><p class="text-green recievedMessage">{{recievedMessage}} </p></div>
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
            recievedMessage: localStorage.getItem('recievedMessage'),
            errorMessage : null,
            token: null,
            user: null
        }
    },
    emits: ["loggedin"],
    created : async function() {
        try {
          // console.log('storedUser & Token:');
          // console.log(localStorage.getItem('user'));
          // console.log(localStorage.getItem('token'));
          this.loginUser();
        }
        catch (error) {
            this.errorMessage = error;
            window.localStorage.setItem('recievedMessage', error);
            console.log(this.errorMessage);
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
                try {
                  const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/login",  {
                    method: "POST",
                    headers: { 
                        "Accept" :  "application/json",
                        "Content-type" : "application/json" 
                    },
                    body: JSON.stringify(userBody)
                })

                const data = await response.json();


                // console.log(data);
                window.localStorage.setItem('recievedMessage', data.message);
                if (data.message === "Oops, something went wrong, please try again"){
                  window.localStorage.setItem('recievedMessage', data.error.email);
                }

                // console.log(recievedMessage);
                console.log(response.status);
                if(response.status === 200) {
                  window.localStorage.setItem('token', data.token);
                  window.localStorage.setItem('user', data.user.name);
                  console.log(localStorage.getItem('user'));
                  this.$emit("loggedin");
                  // this.$router.push('/catalog');
                  window.location.href = "/catalog";
                }

                if (response.status != 200) {
                   throw (response.status);
                }

                window.localStorage.setItem('recievedMessage', data.message);


                if (response.status === 401) {
                  // this.$router.push('/login');
                  window.location.href = "/login";
                } 
                
                // empty form
                this.email = "";
                this.password = "";
              } 
              catch (error) {
                this.errorMessage = error;
                console.log(this.errorMessage);
                // this.$router.push('/login');
                // window.location.href = "/login";
              }


              


                // let token_ls = localStorage.getItem('token');
                // console.log(data.user);

                // this.$emit("loginUser"); // reloads the parent page.

                //https://www.youtube.com/watch?v=GRhkhSzyApc
                
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

.col.centered,
.centered {
  margin-left: auto;
  margin-right: auto;
}

h2.small {
    font-size: x-large;
}

a.register {
  text-decoration: underline;
  line-height: 36px;
  font-size: small;
}

.recievedMessage {
  font-style: italic;
  font-size: smaller;
  margin-top: 1em;
  line-height: 74px;
}

</style>