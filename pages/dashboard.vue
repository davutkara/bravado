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
                    <small
                      class="float-right"
                    >{{progress.goal -progress.score }} assignment remaining</small>
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
            <ul class="list-unstyled">
              <b-media tag="li">
                <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder"></b-img>

                <h5 class="mt-0 mb-1">List-based media object</h5>
                <p class="mb-0">
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                  Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
                  ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </p>
              </b-media>

              <b-media tag="li" class="my-4">
                <b-img slot="aside" blank blank-color="#cba" width="64" alt="placeholder"></b-img>

                <h5 class="mt-0 mb-1">List-based media object</h5>
                <p class="mb-0">
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                  Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
                  ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </p>
              </b-media>

              <b-media tag="li">
                <b-img slot="aside" blank blank-color="#bac" width="64" alt="placeholder"></b-img>

                <h5 class="mt-0 mb-1">List-based media object</h5>
                <p class="mb-0">
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                  Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
                  ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </p>
              </b-media>
            </ul>
            <div class="overflow-auto">
              <b-pagination-nav :number-of-pages="10" use-router></b-pagination-nav>
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
export default {
  layout: 'user',
  components: { bravadoNavigation },
  created() {
    this.GET_PROGRESSES()
  },
  data() {
    return {
      progresses: null,
      search: null
    }
  },
  methods: {
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

