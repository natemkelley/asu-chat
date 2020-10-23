<template>
  <Card>
    <div class="sound-icon" @click="playSound(ding)">
      <img :src="horn" />
      Ding
    </div>

    <div class="sound-icon" @click="playSound(negative)">
      <img :src="horn" />
      Negative
    </div>

    <div class="sound-icon" @click="playSound(timer)">
      <img :src="horn" />
      Timer
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import cloneDeep from "@/node_modules/lodash/cloneDeep";
import ding from "@/assets/audio/ding-sound-effect_1.mp3";
import negative from "@/assets/audio/negative-beep.mp3";
import timer from "@/assets/audio/timer.mp3";
import horn from "@/assets/images/horn.png";

export default {
  components: { Card },
  data() {
    return {
      ding: ding,
      negative: negative,
      timer: timer,
      horn: horn,
      audioSound: ding,
    };
  },
  methods: {
    playSound(sound) {
      if (sound) {
        if (
          !this.audioSound.paused &&
          String(this.audioSound.src).includes(String(sound))
        ) {
          this.stopSound();
          return;
        }
        this.audioSound = new Audio(sound);
        this.audioSound.play();
      }
    },
    stopSound() {
      this.audioSound.pause();
    },
  },
};
</script>

<style lang="scss">
.sound-icon {
  display: flex;
  align-items: center;
  margin: 0px 0px;
  font-size: 30px;
  cursor: pointer;
  border-bottom: 3px solid black;
  padding-bottom: 5px;
  padding-top: 5px;
  img {
    height: 30px;
    margin-right: 10px;
    opacity: 0.85;
    margin-left: 5px;
  }
  &:hover {
    background: rgb(214, 236, 207);
  }
}
</style>
