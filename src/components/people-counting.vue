<template>
  <div class="people-counting">
    <span v-show="!isError && !isReady">
      现在有多少人在休息室 (⊙o⊙)？
    </span>
    <span v-show="isError">
      我也不知道 (ಥ_ಥ)
    </span>
    <span v-show="!isError && isReady">
      {{`现在有${number}人在休息室 ( •̀∀•́ )`}}
    </span>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import io from 'socket.io-client';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  public number = 0;
  public isError = false;
  public isReady = false;

  public created() {
    setTimeout(() => {
      // 获取初始化数据
      axios.get('/res').then((resp) => {
        this.number = resp.data.result.personNum;
        this.isReady = true;
      }, () => {
        this.isError = true;
      });

      // 主动推送
      const socket = io();
      socket.on('res', (res: string) => {
        const msg = JSON.parse(res);
        this.number = msg.result.personNum;
        this.isReady = true;
      });
    }, 1500);
  }
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
  font-size: 4vw;
}

@media (max-width: 767.98px) {
  .people-counting {
    font-size: 6vw;
  }
}
</style>
