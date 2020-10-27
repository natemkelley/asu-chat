<template>
  <div></div>
</template>

<script>
import ding from "@/assets/audio/ding-sound-effect_1.mp3";
import negative from "@/assets/audio/negative-beep.mp3";
import timer from "@/assets/audio/timer.mp3";

export default {
  props: ["sound"],
  data() {
    return {
      ding: ding,
      negative: negative,
      timer: timer,
      audioSound: ding,
    };
  },
  methods: {
    playSound() {
      this.audioSound.play();
    },
    stopSound() {
      this.audioSound.pause();
    },
    resetSound() {
      this.$fireDb.ref().update({
        sound: "",
      });
    },
  },
  watch: {
    sound(newSound) {
      switch (newSound) {
        case "ding":
          this.audioSound = new Audio(ding);
          break;
        case "negative":
          this.audioSound = new Audio(negative);
          break;
        case "timer":
          this.audioSound = new Audio(timer);
          break;
      }

      this.playSound();
      this.resetSound();
    },
  },
};
</script>
