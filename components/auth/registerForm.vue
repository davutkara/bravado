<template>
  <div>
    <b-form @submit="onSubmit">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" v-model="user.firstName" id="firstName" class="form-control">
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" v-model="user.lastName" id="lastName" class="form-control">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="user.email" id="email" class="form-control">
      </div>
      <b-form-group id="input-group-2" label="Age" label-for="input-2">
        <b-form-input id="input-2" type="number" v-model="user.age"></b-form-input>
      </b-form-group>

      <b-form-group label="Gender">
        <b-form-radio v-model="user.gender" name="some-radios" value="male">Male</b-form-radio>
        <b-form-radio v-model="user.gender" name="some-radios" value="female">Female</b-form-radio>
      </b-form-group>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="user.password" id="password" class="form-control">
      </div>

      <div class="form-group">
        <label for="password2">Password again</label>
        <input type="password" v-model="user.password2" id="password2" class="form-control">
      </div>
      <b-button type="submit" variant="success">Register</b-button>
      {{reqMsg}}
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        gender: '',
        password: '',
        password2: ''
      },
      result: null,
      reqMsg: null
    }
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const req = await this.$axios.$post('/api/auth/register', this.user)

      console.log(req.msg)
      if (req.status === 'error' || req.status === 'success')
        this.reqMsg = req.msg
      else this.reqMsg = null
    }
  }
}
</script>
