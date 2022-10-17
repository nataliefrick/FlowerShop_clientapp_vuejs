<template>

<div class="container" id="login">
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
        </form>
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

</style>

<script>
export default {
    data() {
        return {
            name:"",
            email:"",
            password:"",
            errorMessage : null,
            recievedMessage: null,
            user: null
        }
    },
    created : async function() {
        try {
            await this.addUser();
            // this.token = response.data.token;
            // console.log(this.token);
        }
        catch (error) {
            this.errorMessage = error;
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

                const response = await fetch("https://arcane-hamlet-64136.herokuapp.com/api/register",  {
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
                console.log(data.user.name);
                
                // empty form
                this.name = "";
                this.email = "";
                this.password = "";
                
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('recievedMessage', data.message);
                window.localStorage.setItem('user', data.user.name);
                // let token_ls = localStorage.getItem('token');
                // console.log(token_ls);

                this.$emit("addUser"); // reloads the parent page.
                // window.location.href = "/catalog";
            }

        }
    }
}
</script>