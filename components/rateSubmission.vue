<template>
  <div>
    <template v-if="active && list.length">
      <b-container>
        <b-row>
          <b-col>
            <b-button class="mx-auto" @click="prev">&lsaquo; Previous</b-button>
          </b-col>
          <b-col>
            <b-button class="mx-auto" @click="vote(1)" variant="success">+1</b-button>
            <b-button class="mx-auto" @click="vote(-1)" variant="danger">-1</b-button>
          </b-col>
          <b-col>
            <b-button class="mx-auto" @click="next">Next &rsaquo;</b-button>
          </b-col>
        </b-row>
        <hr>
      </b-container>
      <template v-if="upLoader">
        <div class="d-flex justify-content-center mb-3">
          <b-spinner label="Spinning"></b-spinner>
        </div>
      </template>
      <b-containe v-else>
        <b-card v-if="list.length " :title="list[index].name + ' ' + list[index].surname">
          <b-card-text>{{list[index].content}}</b-card-text>
        </b-card>
      </b-containe>
    </template>
    <b-alert
      v-else-if="!active"
      show
      variant="warning"
    >You must be participated before rate a submission.</b-alert>
    <b-alert v-else show variant="warning">There is no submission to rate yet.</b-alert>
  </div>
</template>

<script>
export default {
  name: 'rateSubmission',
  props: ['active', 'challengeId'],
  data() {
    return {
      list: [],
      index: 0,
      upLoader: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    prev() {
      if (this.index === 0) this.index = this.list.length - 1
      else this.index--
    },
    next() {
      if (this.list.length === this.index + 1) this.index = 0
      else this.index++
    },
    async vote(vote) {
      this.upLoader = true
      let { data } = await this.$axios.post(
        process.env.baseUrl + '/api/challenge/submissions/rate',
        {
          submissionId: this.list[this.index].submissionId,
          vote: vote
        },
        {
          headers: {
            authorization: `Bearer ${this.$store.state.auth.token}`
          }
        }
      )
      if (data.status !== 'success') {
        alert(data.msg)
      }
      this.list.splice(this.index, 1)
      this.upLoader = false
    },
    getList: async function(args) {
      this.upLoader = true
      let { data } = await this.$axios.post(
        process.env.baseUrl + '/api/challenge/submissions/pending',
        {
          challengeId: this.challengeId
        },
        {
          headers: {
            authorization: `Bearer ${this.$store.state.auth.token}`
          }
        }
      )
      if (data.length) this.list = data
      this.upLoader = false
    }
  }
}
</script>

<style>
</style>
