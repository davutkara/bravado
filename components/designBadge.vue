<template>
  <b-row class="w-100">
    <b-col>
      Rotate: {{rotate}}
      <b-form-input
        :value="rotate"
        @input="val => $emit('update:rotate', val)"
        type="range"
        :min="0"
        :max="360"
      ></b-form-input>
      Edge: {{edge}}
      <b-form-input
        :value="edge"
        @input="val => $emit('update:edge', val)"
        type="range"
        :min="3"
        :max="20"
      ></b-form-input>
      <no-ssr>
        <color-picker
          class="m-auto"
          :width="200"
          :height="200"
          v-model="colorSub"
          @color-change="val => $emit('update:color', val)"
        ></color-picker>
      </no-ssr>
    </b-col>
    <b-col>
      <b-button-toolbar>
        <b-button-group size="sm" class="mx-1">
          <b-button
            v-show="badgeIndex !== 0"
            @click="badgeIndex = badgeIndex -1"
            variant="outline-secondary"
          >&lsaquo; Prev</b-button>
          <div id="p5sketch">
            <span class="credit">
              <div>
                Icons made by
                <a
                  href="https://www.flaticon.com/authors/popcorns-arts"
                  title="Icon Pond"
                >Icon Pond</a> from
                <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
                <a
                  href="http://creativecommons.org/licenses/by/3.0/"
                  title="Creative Commons BY 3.0"
                  target="_blank"
                >CC 3.0 BY</a>
              </div>
            </span>
            <hr>
          </div>
          <b-button
            v-show="badgeIndex !== badgeImages.length -1"
            @click="badgeIndex = badgeIndex+ 1"
            variant="outline-secondary"
          >Next &rsaquo;</b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-col>
  </b-row>
</template>

<script>
import ColorPicker from 'vue-color-picker-wheel'
export default {
  props: ['edge', 'rotate', 'color'],
  components: {
    ColorPicker
  },
  data() {
    return {
      p5: null,
      badgeIndex: 0,
      colorSub: '#ffffff',
      image: '',
      badgeImages: [
        '/icons/svg/theater.svg',
        '/icons/svg/trophy.svg',
        '/icons/svg/school-bus.svg',
        '/icons/svg/graduates.svg',
        '/icons/svg/certificate.svg',
        '/icons/svg/chemistry.svg',
        '/icons/svg/astronomy.svg',
        '/icons/svg/backpack.svg',
        '/icons/svg/basketball.svg',
        '/icons/svg/geometry.svg',
        '/icons/svg/graduate-1.svg',
        '/icons/svg/graduate.svg',
        '/icons/svg/presentation.svg',
        '/icons/svg/scholarship.svg',
        '/icons/svg/school-bell.svg',
        '/icons/svg/graduation.svg',
        '/icons/svg/history.svg',
        '/icons/svg/learning.svg',
        '/icons/svg/protractor.svg',
        '/icons/svg/reading.svg',
        '/icons/svg/rocket.svg',
        '/icons/svg/location.svg',
        '/icons/svg/microscope.svg',
        '/icons/svg/mouse.svg',
        '/icons/svg/owl.svg',
        '/icons/svg/graduates-1.svg',
        '/icons/svg/graduates-2.svg',
        '/icons/svg/graduates-3.svg',
        '/icons/svg/blackboard.svg',
        '/icons/svg/book.svg',
        '/icons/svg/calendar.svg',
        '/icons/svg/geography.svg',
        '/icons/svg/pencil-box.svg',
        '/icons/svg/school.svg',
        '/icons/svg/send.svg'
      ],
      imageURL: '/icons/svg/theater.svg'
    }
  },
  watch: {
    badgeIndex: function(n, o) {
      if (n >= this.badgeImages.length) n = this.badgeImages.length - 1
      else if (n <= 0) n = 0
      this.imageURL = this.badgeImages[n]
      this.image = this.p5.loadImage(this.imageURL)
      return n
    }
  },
  methods: {
    hexToRgb: function(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            colorR: parseInt(result[1], 16),
            colorG: parseInt(result[2], 16),
            colorB: parseInt(result[3], 16)
          }
        : null
    }
  },
  mounted() {
    if (process.client) {
      const p5 = require('p5')
      const self = this

      const p5sketch = document.getElementById('p5sketch')
      const p5setup = function(p) {
        p.setup = function() {
          p.createCanvas(150, 150)
        }

        p.polygon = function(x, y, radius, npoints) {
          let angle = p.TWO_PI / npoints
          p.beginShape()
          for (let a = 0; a < p.TWO_PI; a += angle) {
            let sx = x + p.cos(a) * radius
            let sy = y + p.sin(a) * radius
            p.vertex(sx, sy)
          }
          p.endShape(p.CLOSE)
        }

        p.preload = function() {
          self.image = p.loadImage(self.imageURL)
        }

        p.draw = function() {
          const { colorR, colorG, colorB } = self.hexToRgb(self.colorSub)
          p.background(255)
          p.image(self.image, 0, 0, 150, 150)
          p.fill(colorR, colorG, colorB, 120)
          p.translate(75, 75)
          p.rotate(self.rotate)
          p.stroke(0)
          p.polygon(0, 0, 65, self.edge)
          p.noStroke()
          p.resetMatrix()
          p.textAlign(p.CENTER)
          p.textLeading(20)
          p.textStyle(p.BOLD)
          p.textFont('Arial')
          p.fill(0)
          p.stroke(255)
          p.text('125 P\n 300 A\n 60 D\n', 70, 60)
        }

        p.windowResized = function() {
          //p.resizeCanvas(p5sketch.clientWidth, p5sketch.clientHeight)
        }
      }

      self.p5 = new p5(p5setup, p5sketch)
    }
  }
}
</script>

<style>
#p5sketch {
  margin: 0 10px;
}
span.credit {
  font-size: 10px;
  color: dimgrey;
}
</style>
