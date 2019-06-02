<template>
  <div>
    <b-container fluid>
      <bravado-navigation></bravado-navigation>
    </b-container>
    <hr>
    <b-container fluid>
      <b-card title="Create a new challenge">
        <b-card-text>Please do not create similar challenge :)</b-card-text>
        <b-form @submit="createNewChallengeSubmit">
          <b-row>
            <b-col md="6">
              <div class="card-header">Creation form</div>
              <hr>
              <b-form-group label="Challenge title:" label-for="challenge-title">
                <b-form-input
                  v-model="title"
                  id="challenge-title"
                  placeholder="Enter a title"
                  :state="validationState(response.key,null,'title')"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validationState(response.key,null,'title')"
                >{{response.msg}}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Choose categories" id="challenge-category">
                <b-form-checkbox-group
                  v-model="categories"
                  id="challenge-category"
                  :state="validationState(response.key,['title'],'categories')"
                >
                  <b-form-checkbox value="1">Watching movie/series</b-form-checkbox>
                  <b-form-checkbox value="2">Reading book</b-form-checkbox>
                  <b-form-checkbox value="4">Playing video game</b-form-checkbox>
                  <b-form-checkbox value="5">Cooking</b-form-checkbox>
                  <b-form-checkbox value="6">Travelling new places</b-form-checkbox>
                  <b-form-checkbox value="7">Learning foreign languages</b-form-checkbox>
                  <b-form-checkbox value="8">Learning programming languages</b-form-checkbox>
                  <b-form-checkbox value="9">Playing musical instruments</b-form-checkbox>
                  <b-form-checkbox value="10">Redesign old stuff</b-form-checkbox>
                  <b-form-checkbox value="11">Body building</b-form-checkbox>
                </b-form-checkbox-group>
                <b-form-invalid-feedback
                  :state="validationState(response.key,['title'],'categories')"
                >{{response.msg}}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Challenge Start Date:" label-for="challenge-startDate">
                <b-form-input
                  v-model="startDate"
                  id="challenge-startDate"
                  placeholder="Enter start date"
                  :state="validationState(response.key,['title','categories'],'startDate')"
                ></b-form-input>

                <b-form-invalid-feedback
                  :state="validationState(response.key,['title','categories'],'startDate')"
                >{{response.msg}}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Challenge Finish Date:" label-for="challenge-finishDate">
                <b-form-input
                  v-model="finishDate"
                  id="challenge-finishDate"
                  placeholder="Enter finish date"
                  :state="validationState(response.key,['title','categories','startDate'],'finishDate')"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validationState(response.key,['title','categories','startDate'],'finishDate')"
                >{{response.msg}}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Challenge Goal:" label-for="challenge-goal">
                <b-form-input
                  v-model="goal"
                  type="number"
                  id="challenge-goal"
                  placeholder="Enter total assignment number as goal"
                  :state="validationState(response.key,['title','categories','startDate','finishDate'],'goal')"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validationState(response.key,['title','categories','startDate','finishDate'],'goal')"
                >{{response.msg}}</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Challenge Description:" label-for="challenge-description">
                <b-form-textarea
                  v-model="description"
                  id="challenge-description"
                  placeholder="Write something about challenge for example purpose and rules..."
                  rows="5"
                  max-rows="8"
                  :state="validationState(response.key,['title','categories','startDate','finishDate','goal'],'description')"
                ></b-form-textarea>
                <b-form-invalid-feedback
                  :state="validationState(response.key,['title','categories','startDate','finishDate','goal'],'description')"
                >{{response.msg}}</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <div class="card-header">Design the badge</div>
              <hr>
              <design-badge
                :rotate.sync="badge.rotate"
                :edge.sync="badge.edge"
                :color.sync="badge.color"
              ></design-badge>
              <hr>
              <b-alert
                :show="response.status === 'success' ? 5 : 0"
                dismissible
                variant="success"
                @dismissed="()=> $router.replace('/profile')"
                @dismiss-count-down="(val) => dismissCountDown=val"
                class="float-left"
              >
                <p>
                  Challenge succuessfuly created.
                  Redirecting {{ dismissCountDown }} seconds...
                </p>
                <b-progress variant="success" :max="5" :value="dismissCountDown" height="4px"></b-progress>
              </b-alert>
              <b-button variant="success" type="submit" class="float-right">Create</b-button>
            </b-col>
          </b-row>
        </b-form>
        <hr>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import bravadoNavigation from '~/components/bravadoNavigation.vue'
import designBadge from '~/components/designBadge.vue'
export default {
  layout: 'user',
  components: { bravadoNavigation, designBadge },
  data: function() {
    return {
      dismissCountDown: 0,
      title: '',
      categories: '',
      startDate: '',
      finishDate: '',
      goal: '',
      description: '',
      badge: {
        rotate: '5',
        edge: '5',
        color: '#ffffff'
      },
      response: {
        status: null,
        key: null,
        msg: null
      }
    }
  },
  methods: {
    validationState: function(key, preContidions, value) {
      if (this.response.status === 'success') return true
      if (key === 'form' && value !== 'form') return null
      if (key === undefined || key === null) return null

      if (preContidions !== null)
        for (let i = 0; i < preContidions.length; i++)
          if (key === preContidions[i]) return null

      return key !== value
    },
    createNewChallengeSubmit: async function(e) {
      e.preventDefault()

      try {
        const { data } = await this.$axios.post(
          '/api/challenge/add',
          {
            title: this.title,
            categories: this.categories,
            startDate: this.startDate,
            finishDate: this.finishDate,
            Goal: String(this.goal),
            description: this.description,
            badge: this.badge
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.auth.token}`
            }
          }
        )
        this.response = data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
