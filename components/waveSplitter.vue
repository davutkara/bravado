<template>
  <svg
    version="1.1"
    id="wave-splitter"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 1440 126"
    style="enable-background:new 0 0 1440 126;"
    xml:space="preserve"
  >
    <style type="text/css">
  .st0 {
    fill: {{color}};
  }
    </style>
    <title>Rectangle 3</title>
    <desc>Created with Sketch.</desc>
    <path
      class="st0"
      d="M685.6,38.8C418.7-11.1,170.2,9.9,0,30v96h1440V30C1252.7,52.2,1010,99.4,685.6,38.8z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style>
@media only screen and (min-width: 600px) {
  #wave-splitter {
    margin-top: -9em;
    z-index: 1;
    position: relative;
  }
}

@media only screen and (max-width: 600px) {
  .carousel-caption {
    padding-top: unset !important;
  }
}
</style>
