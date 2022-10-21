<template>

<div class="container" id="register">
    <h2 class="green-text small">Register new user</h2>
    <div class="row">
      <div class="section col s2 m4"></div>
      <div class="section col s8 m4">
        <form @submit.prevent="addUser()" class="col s12">
          <div class="input-field">
              <!-- "name"   -->
            <input v-model="name" id="name" type="text" class="validate">
            <label for="name">Name</label>
          </div>
          <div class="input-field">
              <!--  email  -->
            <input v-model="email" id="email" type="text" class="validate">
            <label for="email">Email</label>
          </div>

          <div class="input-field">
              <!-- password -->
            <input v-model="password" id="password" type="text" class="validate">
            <label for="password">Password</label>
          </div>

          <button class="btn waves-effect waves-light right green" type="submit" name="action">Register
              <i class="material-icons right">send</i>
          </button>
          <RouterLink class="green-text register" to="/register">Login</RouterLink>
        </form>
        <!-- ErrorMessage Printout -->
        <div v-if="recievedMessage"><p class="text-green recievedMessage">{{recievedMessage}} </p></div>
        <!-- <div v-if="errorMessage"><p class="text-green recievedMessage">{{errorMessage}} </p></div> -->
      </div>
      <div class="section col s2 m4"></div>

    </div>
  </div>

</template>

<style scoped>

div#login {
    margin: 4em auto;
    text-align: center;
}

h2.small {
    font-size: x-large;
}
a.register {
  text-decoration: underline;
  line-height: 36px;
}

.recievedMessage {
  font-style: italic;
  font-size: smaller;
  margin-top: 1em;
  line-height: 74px;
}

</style>

<script>
export default {
    data() {
        return {
            name:"",
            email:"",
            password:"",
            recievedMessage : null,
            errorMessage : null,
            user: null
        }
    },
    created : async function() {
        try {
            await this.addUser();
        }
        catch (error) {
            this.errorMessage = error;
            window.localStorage.setItem('recievedMessage', error);
            console.log(this.errorMessage);
        }
    },
    methods: {
        async addUser() {

            // check first for content
            if(this.name.length > 2 ) {
                let userBody = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                };

                console.log(JSON.stringify(userBody));
                try {
                const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/register",  {
                    method: "POST",
                    headers: {
                        "Accept" :  "application/json",
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(userBody)
                })

                const data = await response.json();

                console.log(response.status);

                if(response.status === 200) {
                  window.localStorage.setItem('token', data.token);
                  window.localStorage.setItem('user', data.user.name);
                  console.log(localStorage.getItem('user'));
                  this.$emit("loggedin");
                  // this.$router.push('/catalog');
                  window.location.href = "/catalog";
                }


                window.localStorage.setItem('recievedMessage', data.error.email)
                if(data.error.email == 'The email has already been taken.'){
                    console.log(data.error.email);
                    window.localStorage.setItem('recievedMessage', data.message);
                    window.location.href = "/login";
                };
                this.recievedMessage = window.localStorage.getItem('recievedMessage');

                if (response.status != 200) {
                   throw (response.status);
                }

            }
            catch (error) {
                this.errorMessage = error;
                console.log("catcherror: " + this.errorMessage);
                // this.$router.push('/login');
                // window.location.href = "/login";
            }

                // empty form
                this.name = "";
                this.email = "";
                this.password = "";

                // window.localStorage.setItem('token', data.token);
                // window.localStorage.setItem('recievedMessage', data.message);
                // window.localStorage.setItem('user', data.user.name);
                // let token_ls = localStorage.getItem('token');
                // console.log(token_ls);

                // this.$emit("addUser"); // reloads the parent page.
                // window.location.href = "/catalog";
                //this.$router.push('/catalog');
            } 
            // else {
            //     window.localStorage.setItem('recievedMessage', "Please fill in all fields.");
            //     this.recievedMessage = "Please fill in all fields."
            //     console.log(this.recievedMessage);
            //     //this.$router.push('/register');
            //     window.location.href = "/register";
            // }

        }
    }
}
</script>