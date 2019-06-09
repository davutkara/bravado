<template>
  <div>
    <b-container fluid>
      <bravado-navigation></bravado-navigation>
    </b-container>
    <hr>
    <b-container id="dashboard" fluid>
      <b-row>
        <b-col md="4">
          <b-card border-variant="light" header="In Progress" class="text-center">
            <!-- 
            <b-dropdown variant="outline-dark">
              <template slot="button-content">
                Sort
                <strong>progresses</strong>
              </template>
              <b-dropdown-item href="#" @click="sortByTime">Remaining time</b-dropdown-item>
              <b-dropdown-item href="#" @click="sortByAssignment">Remaining assignment</b-dropdown-item>
            </b-dropdown>
            <hr>
            -->
            <b-list-group>
              <div class="d-flex justify-content-center mb-3" v-if="progresses === null">
                <b-spinner label="Spinning"></b-spinner>
              </div>
              <b-alert
                variant="warning"
                v-else-if="Object.keys(progresses).length < 1"
                show
              >Your progress can not be calculated, please start to submit an assignment to challenge that you participated</b-alert>
              <template v-else>
                <nuxt-link
                  class="list-group-item list-group-item-action"
                  :to="{
                    name: 'challenge',
                    params: {
                      id: progress.challengeId
                    }
                  }"
                  v-for="(progress,i) in progresses"
                  :key="i"
                >
                  <b-list-group-item>
                    {{progress.title}}
                    <b-progress :value="progress.score" :max="progress.goal" show-progress animated></b-progress>
                    <small>{{progress.goal -progress.score }} assignments remaining</small>
                  </b-list-group-item>
                </nuxt-link>
              </template>
            </b-list-group>
          </b-card>
        </b-col>
        <b-col>
          <b-card border-variant="light" header="Search a challenge" class="text-center">
            <b-form @submit="searchChallenge" inline>
              <b-input v-model="search" placeholder="Write keywords then enter" class="w-100"></b-input>
            </b-form>
          </b-card>
          <hr>
          <b-card border-variant="light" header="Feeds">
            <div class="d-flex justify-content-center mb-3" v-if="feedLoader">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <ul class="list-unstyled" v-else>
              <b-media tag="li" v-for="(feed,i) in feedList" :key="i">
                <b-img
                  slot="aside"
                  :src="JSON.parse(feed.reward).imageURL"
                  width="64"
                  height="64"
                  alt="placeholder"
                ></b-img>
                <p class="mb-1">
                  {{feed.name}} {{feed.surname}} has been
                  <strong>{{feed.status | prettyStatus}}</strong> the
                  <nuxt-link
                    :to="{name:'challenge', params: {id : feed.challengeId}}"
                  >{{feed.title}} challenge</nuxt-link>
                </p>
                <p class="mb-3">{{feed.date | timeago}}</p>
              </b-media>
            </ul>
            <div class="overflow-auto">
              <b-pagination v-model="page" :total-rows="feeds.length" :per-page="PER_PAGE"></b-pagination>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import bravadoNavigation from '~/components/bravadoNavigation.vue'
import { mapActions } from 'vuex'
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export default {
  layout: 'user',
  components: { bravadoNavigation },
  created() {
    this.GET_PROGRESSES()
    this.getFeeds()
  },
  async fetch({ store }) {
    await store.dispatch('user/GET_PARTICIPATIONS')
  },
  data() {
    return {
      progresses: null,
      search: null,
      page: 1,
      feeds: [],
      PER_PAGE: 10,
      feedLoader: null
    }
  },
  filters: {
    prettyStatus(val) {
      if (val === 'gaveUp') return 'quit'
      else if (val === 'inProgress') return 'joined'
      else return val
    },
    timeago(datetime) {
      return timeAgo.format(
        new Date(datetime.replace('T', ' ').replace('.000Z', ''))
      )
    }
  },
  computed: {
    feedList() {
      var self = this
      this.feedLoader = true
      let borkenFeeds = [...this.feeds]
      setTimeout(() => {
        self.feedLoader = false
      }, 1001)
      return borkenFeeds.splice(this.PER_PAGE * (this.page - 1), this.PER_PAGE)
    }
  },
  methods: {
    async getFeeds() {
      this.feedLoader = true
      let { data } = await this.$axios.post(
        process.env.baseUrl + '/api/challenge/feeds',
        {
          challengesIds: Object.keys(this.$store.state.user.participations)
        },
        {
          headers: {
            authorization: `Bearer ${this.$store.state.auth.token}`
          }
        }
      )
      if (data.length) this.feeds = data
      this.feedLoader = false
    },
    searchChallenge(e) {
      e.preventDefault()
      this.$router.push({ name: 'challenges', params: { search: this.search } })
    },
    sortByTime() {
      // will be implement
    },
    sortByAssignment() {
      // will be implement
    },
    ...mapActions({
      GET_PROGRESSES(dispatch, params) {
        let self = this
        dispatch('user/GET_PROGRESSES', {
          onSuccess: progresses => {
            self.progresses = progresses
          },
          onFailure: () => {
            alert(2)
          }
        })
      }
    })
  }
}
</script>

