<template>

<div class="container" id="login">
    <h2 class="green-text small">Forgot Password</h2>
    <div class="row">
      <div class="section col s2 m4"></div>
      <div class="section col s8 m4">
        <div class="input-field">
            <!-- v-model="email"   -->
          <input id="emai" type="text" class="validate">
          <label for="emai">Email</label>
        </div>
        <button class="btn waves-effect waves-light right green" type="submit" name="action">Reset password
            <i class="material-icons right">send</i>
        </button>
      </div>
      <div class="section col s2 m4"></div>

    </div>
  </div>

</template>

<script>
export default {
    data() {
        return {}
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