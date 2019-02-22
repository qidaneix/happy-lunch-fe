<template>
  <div class="people-counting">
    <transition name="fade">
      <div v-if="!isError && !isReady" class="item item-1" key="hold">
        现在有多少人在休息室 (⊙o⊙)？
      </div>
      <div v-if="isError" class="item item-2" key="error">
        我也不知道 (ಥ_ಥ)
      </div>
      <div v-if="!isError && isReady" class="item item-3" key="ready">
        现在有<span class="color-01">{{number}}</span>人在休息室 (´･ω･`)
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import io from 'socket.io-client';
import anime from 'animejs';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Res, Result } from '@/interface';

@Component
export default class extends Vue {
  public number = 0;
  public isError = false;
  public isReady = false;

  public created() {
    setTimeout(() => {
      // 获取初始化数据
      axios.get<Res<Result>>('/res').then((resp) => {
        this.number = resp.data.result.personNum;
        this.isReady = true;
      }, () => {
        this.isError = true;
      });

      // 主动推送
      const socket = io();
      socket.on('res', (res: string) => {
        const msg = JSON.parse(res) as Res<Result>;
        anime({
          targets: this,
          number: msg.result.personNum,
          round: 1,
          duration: 2000,
          easing: 'easeInOutExpo',
        });
        this.isReady = true;
      });
    }, 1500);
  }
}
</script>

<style scoped lang="scss">
.people-counting {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .item {
    position: absolute;
    flex: none;
    &.item-1 {
      z-index: 12;
    }
    &.item-2 {
      z-index: 11;
    }
    &.item-3 {
      z-index: 10;
    }
  }
  font-size: 4vw;
}

@media (max-width: 767.98px) {
  .people-counting {
    font-size: 6vw;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.fade-enter {
  transform: translateY(-4vw);
}
.fade-leave-active {
  transform: translateY(4vw);
}
</style>
