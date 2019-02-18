<template>
  <div class="people-counting">
    {{`现在有${number}人在休息室`}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  public number = 888;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.people-counting {
  position: absolute;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  line-height: 100vh;
  text-align: center;
}
</style>
