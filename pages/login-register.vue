<template>
  <div>
    <b-container id="login-register">
      <p id="mainheader">BRAVADO Registration</p>
      <nuxt-link to="/">
        <b-button variant="light">&laquo; Back to Homepage</b-button>
      </nuxt-link>
      <b-row style="padding:1em;">
        <b-col md="6">
          <div id="socialdiv">
            <p class="header text-center">LOGIN FORM</p>
            <login-form></login-form>
          </div>
        </b-col>
        <b-col md="6">
          <p class="header text-center">REGISTER FORM</p>
          <register-form></register-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import loginForm from '~/components/auth/loginForm.vue'
import registerForm from '~/components/auth/registerForm.vue'
export default {
  components: {
    loginForm,
    registerForm
  }
}
</script>

<style>
#mainheader {
  font-size: 50px;
  text-align: center;
  background-color: lightblue;
  color: black;
  padding: 40px;
  border-radius: 5vw;
}

#login-register {
  background: white;
  padding: 1em;
  border-radius: 5vw;
}

.header {
  font-size: 30px;
  text-align: center;

  color: black;
  padding: 40px;
}
</style>
