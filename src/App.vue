<template>
  <div id="app">
    <people-counting></people-counting>
    <fireworks></fireworks>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import fireworks from './components/fireworks.vue';
import peopleCounting from './components/people-counting.vue';

@Component({
  components: {
    fireworks,
    peopleCounting,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
header {
	background-color: #111116; /* Black */
}

body {
  position: absolute;
  color: white;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.color-01 { color: #FF1461; } /* Red */
.color-02 { color: #FF7C72; } /* Orange */
.color-03 { color: #FBF38C; } /* Yellow */
.color-04 { color: #A6FF8F; } /* Citrus */
.color-05 { color: #18FF92; } /* Green */
.color-06 { color: #1CE2B2; } /* Darkgreen */
.color-07 { color: #5EF3FB; } /* Turquoise */
.color-08 { color: #61C3FF; } /* Lightblue */
.color-09 { color: #5A87FF; } /* Blue */
.color-10 { color: #8453E3; } /* Purple */
.color-11 { color: #C26EFF; } /* Lavender */
.color-12 { color: #FB89FB; } /* Pink */
</style>
