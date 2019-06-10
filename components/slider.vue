<template>
  <section id="slider">
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide caption="BRAVADO" caption-tag="h1" img-src="/slide1.jpg">
        <h4>Habit tracking in social way</h4>

        <nuxt-link to="login-register">
          <b-button>Login & Register Bravado</b-button>
        </nuxt-link>
      </b-carousel-slide>
    </b-carousel>
  </section>
</template>

<script>
import resize from '~/plugins/mixins/resize.js'
export default {
  name: 'slider',
  mixins: [resize]
}
</script>


<style>
#slider {
}
#slider h1 {
  font-size: 10vw;
}
#slider .carousel-caption {
  bottom: unset !important;
  background: rgba(255, 255, 255, 0.7);
  color: #0b3557;
  top: 25%;
}
</style>