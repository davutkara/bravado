<template>
  <div>
    <b-container fluid>
      <bravadoNavigation></bravadoNavigation>
    </b-container>
    <hr>
    <b-container fluid>
      <template v-if="upLoader">
        <div class="d-flex justify-content-center mb-3">
          <b-spinner label="Spinning"></b-spinner>
        </div>
      </template>
      <template v-else>
        <nuxt-link
          v-if="isParticipated"
          :to="{
            name: `assignment`,
            params: {
               id : $route.params.id,
               startDate: $store.state.challenge.startDate,
               finishDate: $store.state.challenge.finishDate
            }
           }"
        >
          <b-button block variant="primary">Submit Assignment</b-button>
        </nuxt-link>
        <b-button block variant="info" v-else @click="joinChallenge">Join Challenge</b-button>
      </template>
      <hr>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="About" active>
            <b-card-text>
              <b-media>
                <b-img slot="aside" :src="reward.imageURL" width="150" alt="placeholder"></b-img>

                <h3 class="mt-0 mb-1">{{title}}</h3>
                <b-badge variant="info">Start Date: {{startDate | prettyDate}}</b-badge>
                <b-badge variant="warning">Finish Date: {{finishDate | prettyDate}}</b-badge>
                <b-badge variant="danger">Goal: {{goal}}</b-badge>
                <hr>
                <p class="mb-0">{{content}}</p>
              </b-media>
            </b-card-text>
          </b-tab>
          <b-tab title="Feeds">
            <b-card-text>Tab Contents 2</b-card-text>
          </b-tab>
          <b-tab title="Rete Submissions">
            <rate-submission :active="isParticipated" :challengeId="$route.params.id"></rate-submission>
          </b-tab>
          <b-tab title="Participants">
            <b-card-group columns>
              <template
                v-for="(participate,i) in participants"
                v-if="activeUser(participate.progress)"
              >
                <b-card
                  :title="`${participate.name} ${participate.surname}`"
                  img-src="http://localhost:3000/icons/svg/042-winner.svg"
                  img-alt="Image"
                  img-width="50"
                  style="max-width: 20rem;"
                  :key="i"
                >
                  <b-card-text>GaveUp: {{participate.progress | gaveUp}}</b-card-text>
                  <b-card-text>Completed: {{participate.progress | completed}}</b-card-text>
                  <b-card-text>InProgress: {{participate.progress | inProgress}}</b-card-text>
                </b-card>
                <hr v-if="i % 2 === 0 && i !== 0" :key="i">
              </template>
            </b-card-group>
          </b-tab>
        </b-tabs>
      </b-card>
      <hr>
      <b-button block variant="danger" v-show="isParticipated" @click="quitChallenge">Quit Challenge</b-button>
    </b-container>
  </div>
</template>

<script>
import bravadoNavigation from '~/components/bravadoNavigation.vue'
import { mapActions } from 'vuex'
import rateSubmission from '~/components/rateSubmission.vue'
export default {
  layout: 'user',
  async asyncData({ store, redirect, route }) {
    const { id } = route.params
    if (id === undefined) {
      redirect('/profile')
    } else {
      await store.dispatch('challenge/GET_CHALLENGE', { id })
      const isParticipated =
        store.state.user.participations[id] !== undefined &&
        store.state.user.participations[id].status === 'inProgress'

      await store.dispatch('challenge/GET_PARTICIPANTS', { id })
      return { isParticipated }
    }
  },
  filters: {
    prettyDate: function(val) {
      if (val !== undefined) return val.split('T')[0]
    },
    gaveUp: function(str) {
      let obj = JSON.parse(`{${str}}`)
      return obj.gaveUp >= 1 ? obj.gaveUp : 0
    },
    completed: function(str) {
      let obj = JSON.parse(`{${str}}`)
      return obj.completed >= 1 ? obj.completed : 0
    },
    inProgress: function(str) {
      let obj = JSON.parse(`{${str}}`)
      return obj.inProgress >= 1 ? obj.inProgress : 0
    }
  },
  data: function() {
    return {
      upLoader: null
    }
  },
  computed: {
    challengeId: function() {
      return this.$store.state.challenge.challengeId
    },
    title: function() {
      return this.$store.state.challenge.title
    },
    content: function() {
      return this.$store.state.challenge.content
    },
    startDate: function() {
      return this.$store.state.challenge.startDate
    },
    finishDate: function() {
      return this.$store.state.challenge.finishDate
    },
    goal: function() {
      return this.$store.state.challenge.goal
    },
    reward: function() {
      return this.$store.state.challenge.reward
    },
    participants: function() {
      return this.$store.state.challenge.participants
    }
  },
  components: { bravadoNavigation, rateSubmission },
  destroyed() {
    this.$store.commit('challenge/RESET_ALL')
  },
  methods: {
    activeUser: function(str) {
      const obj = JSON.parse(`{${str}}`)
      return obj.inProgress >= 1 ? true : false
    },
    ...mapActions({
      quitChallenge(dispatch) {
        let self = this
        this.upLoader = true
        dispatch('user/QUIT_CHALLENGE', {
          challengeId: self.challengeId,
          onSuccess: function() {
            self.isParticipated = false
            self.upLoader = false
            dispatch('challenge/GET_PARTICIPANTS', {
              id: self.$route.params.id
            })
          },
          onFailure: function(err) {
            self.isParticipated = true
            self.upLoader = false
          }
        })
      },
      joinChallenge(dispatch) {
        let self = this
        this.upLoader = true
        dispatch('user/JOIN_CHALLENGE', {
          challengeId: self.challengeId,
          onSuccess: function() {
            self.isParticipated = true
            self.upLoader = false
            dispatch('challenge/GET_PARTICIPANTS', {
              id: self.$route.params.id
            })
          },
          onFailure: function(err) {
            self.isParticipated = false
            self.upLoader = false
          }
        })
      }
    })
  }
}
</script>

<style>
</style>
