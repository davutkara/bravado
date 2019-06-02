<template>
  <div>
    <b-container fluid>
      <bravado-navigation></bravado-navigation>
    </b-container>
    <hr>
    <b-container id="profile" fluid>
      <b-row>
        <b-col md="2">
          <b-card border-variant="light" :header="userFullName" class="text-center">
            <img
              src="https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png"
              class="img-fluid"
              alt="Responsive image"
            >
          </b-card>
          <hr>

          <b-button block variant="light" v-b-modal.modal-1>Edit Profile</b-button>
          <b-modal id="modal-1" title="Change Account Settings" @ok="onSubmit" @show="modalOpened">
            <b-form-group>
              <b-form-group
                label-cols-sm="4"
                label="Name:"
                label-align-sm="right"
                label-for="nested-name"
              >
                <b-form-input v-model="user.firstName" id="nested-name" placeholder="Enter name"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="4"
                label="Surname:"
                label-align-sm="right"
                label-for="nested-surname"
              >
                <b-form-input
                  v-model="user.lastName"
                  id="nested-surname"
                  placeholder="Enter surname"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="4"
                label="Email:"
                label-align-sm="right"
                label-for="nested-email"
              >
                <b-form-input v-model="user.email" id="nested-email" placeholder="Enter e-mail"></b-form-input>
              </b-form-group>

              <b-form-checkbox
                v-model="user.updatePasswordState"
                name="checkbox-1"
                :value="true"
                :uchecked-value="false"
              >I want to change my password</b-form-checkbox>
              <hr>
              <div v-show="user.updatePasswordState">
                <b-form-group
                  label-cols-sm="4"
                  label="Password:"
                  label-align-sm="right"
                  label-for="nested-password"
                >
                  <b-form-input
                    v-model="user.password"
                    id="nested-password"
                    type="password"
                    placeholder="Enter password"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label-cols-sm="4"
                  label="Password Again:"
                  label-align-sm="right"
                  label-for="nested-password-again"
                >
                  <b-form-input
                    v-model="user.password2"
                    id="nested-password-again"
                    type="password"
                    placeholder="Enter password again"
                  ></b-form-input>
                </b-form-group>
              </div>
            </b-form-group>
            <div slot="modal-footer" slot-scope="{ ok, cancel }" class="w-100">
              <b-row>
                <b-col>
                  <p class="float-left">{{reqMsg}}</p>
                </b-col>
                <b-col>
                  <b-button variant="success" @click="ok()" class="float-right">OK</b-button>
                  <b-button
                    variant="danger"
                    @click="cancel()"
                    class="float-right"
                    style="margin-right:10px;"
                  >Cancel</b-button>
                </b-col>
              </b-row>
            </div>
          </b-modal>
        </b-col>

        <b-col md="10">
          <b-card border-variant="light" class="text-center">
            <div slot="header" class="mb-0">
              Stability by
              <b-dropdown
                id="dropdown-1"
                :text="`year ${selectedYear}`"
                size="sm"
                variant="outline-secondary"
              >
                <b-dropdown-item @click="selectedYear= 2019">2019</b-dropdown-item>
                <b-dropdown-item @click="selectedYear = 2018">2018</b-dropdown-item>
              </b-dropdown>
            </div>
            <stability :year="selectedYear"></stability>
          </b-card>
        </b-col>
      </b-row>

      <hr>

      <b-row>
        <b-col md="12">
          <b-card border-variant="light" header="Completed" class="text-center"></b-card>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="12">
          <b-card border-variant="light" header="In Progress" class="text-center"></b-card>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="12">
          <b-card border-variant="light" header="Created Challanges" class="text-center"></b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import bravadoNavigation from '~/components/bravadoNavigation.vue'
import stability from '~/components/stability.vue'

export default {
  layout: 'user',
  beforeMount() {
    this.$store.dispatch('user/GET_ME')
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',

        updatePasswordState: false
      },
      reqMsg: null,
      selectedYear: 2019
    }
  },
  computed: {
    userFullName: function() {
      return `${this.$store.state.user.name} ${this.$store.state.user.surName}`
    }
  },
  components: { bravadoNavigation, stability },
  methods: {
    modalOpened() {
      this.user.firstName = this.$store.state.user.name
      this.user.lastName = this.$store.state.user.surName
      this.user.email = this.$store.state.user.email
    },
    ...mapActions({
      onSubmit(dispatch, e) {
        e.preventDefault()
        let self = this
        dispatch('user/update', {
          user: self.user,
          onSuccess: function() {
            setTimeout(function() {
              self.$bvModal.hide('modal-1')
            }, 1000)
          },
          onFailure: function(err) {
            console.log('calisti')
            self.reqMsg = err
          }
        })
      }
    })
  }
}
</script>