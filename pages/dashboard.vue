<template>
  <b-row class="justify-content-md-center">
    <b-col cols="12" md="10">
      <b-container fluid>
        <bravado-navigation></bravado-navigation>
      </b-container>
      <hr>
      <b-container id="dashboard" fluid>
        <b-row>
          <b-col md="4">
            <b-card border-variant="light" header="In Progress" class="text-center">
              <b-dropdown variant="outline-dark">
                <template slot="button-content">
                  Sort
                  <strong>progresses</strong>
                </template>
                <b-dropdown-item href="#">Time remain</b-dropdown-item>
                <b-dropdown-item href="#">Assignment remain</b-dropdown-item>
              </b-dropdown>
              <hr>
              <b-list-group>
                <b-list-group-item
                  href="#some-link"
                  v-for="(ob,i) in [0,1,2,3,4,5,6,7,8,9,10]"
                  :key="i"
                >
                  Reading Challange {{i}} days.
                  <b-progress :value="100-i*10" :max="100" show-progress animated></b-progress>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col>
            <b-card border-variant="light" header="Search a challange" class="text-center">
              <b-form inline>
                <b-input placeholder="Write keywords then enter" class="w-100"></b-input>
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
    </b-col>
  </b-row>
</template>

<script>
import bravadoNavigation from '~/components/bravadoNavigation.vue'

export default {
  components: { bravadoNavigation }
}
</script>

<style>
#navigation img {
  max-width: 100px;
}

#navigation .nav-item {
  background: #f7f7f7;
  margin-right: 1em;
}

#navigation .nav-item:hover {
  background: #fff;
}

#navigation .nav-item:hover,
.nav-link.active {
  font-weight: bold;
}

#navigation .nav-item:hover img,
.nav-link.active img {
  padding-top: 1em;
}

#navigation .nav-item,
.nav-link.active {
  background: #f7f7f7;
  margin-right: 1em;
  -webkit-border-top-left-radius: 200px;
  -webkit-border-top-right-radius: 200px;
  -moz-border-radius-topleft: 200px;
  -moz-border-radius-topright: 200px;
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
}

#navigation span {
  clear: both;
  font-size: 20pr;
}
</style>