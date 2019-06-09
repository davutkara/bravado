<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <!-- EMAIL INPUT -->
    <b-form-group label="Email address:" label-for="input-email">
      <b-form-input
        id="input-email"
        v-model="email"
        type="email"
        required
        placeholder="Enter email"
        :state="validationState(response.key,null,'email')"
      ></b-form-input>
      <b-form-invalid-feedback :state="validationState(response.key,'email')">{{response.msg}}</b-form-invalid-feedback>
    </b-form-group>

    <!-- PASSWORD INPUT -->
    <b-form-group label="Password:" label-for="input-pw">
      <b-form-input
        id="input-pw"
        v-model="password"
        type="password"
        placeholder="Password"
        :state="validationState(response.key,['email'],'password')"
      ></b-form-input>
      <b-form-invalid-feedback
        :state="validationState(response.key,['email'],'password')"
      >{{response.msg}}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-invalid-feedback :state="validationState(response.key,['email','password'],'form')">
      <hr>
      {{response.msg}}
      <hr>
    </b-form-invalid-feedback>
    <b-button type="submit" size="lg" variant="primary">Login via account</b-button>
    <b-button type="reset" size="lg" variant="secondary">Reset form</b-button>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex'
import get from 'undefsafe'
import def from 'defined'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    response() {
      const status = get(this.$store.state.auth.response, 'status')
      if (status === 'success') {
        this.$store.commit('auth/SET_RESPONSE', undefined)
        this.$router.replace('/profile')
      }
      return {
        key: get(this.$store.state.auth.response, 'key'),
        msg: get(this.$store.state.auth.response, 'msg'),
        status
      }
    }
  },
  methods: {
    /**
     * Key(str) is result of variable
     * preContidions([str]) are previous values must be matched
     * value: actual value that must be matched.
     */
    validationState: (key, preContidions, value) => {
      if (key === 'form' && value !== 'form') return null
      if (key === undefined || key === null) return null

      if (preContidions !== null)
        for (let i = 0; i < preContidions.length; i++)
          if (key === preContidions[i]) return null

      return key !== value
    },
    onReset(e) {
      e.preventDefault()
      this.email = ''
      this.password = ''
    },
    ...mapActions({
      onSubmit(dispatch, e) {
        e.preventDefault()
        dispatch('auth/login', { email: this.email, password: this.password })
      }
    })
  }
}
</script>

<style>
</style>
