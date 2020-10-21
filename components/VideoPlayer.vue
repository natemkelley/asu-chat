<template>
  <div>
    <video ref="videoPlayer" class="video-js " muted="muted"></video>-->
  </div>
</template>

<script>
import videojs from "video.js";
import videojsCSS from "video.js/dist/alt/video-js-cdn.css";

export default {
  name: "VideoPlayer",
  props: { src: String, videoPlaybackStatus: Boolean, time: Number },
  data() {
    return {
      percentageObj: null,
      player: null,
      playerIsReady: false,
      videoOptions: {
        autoplay: false,
        controls: false,
        preload: true,
        width: "100vw",
        sources: [
          {
            src: this.src,
            type: "video/mp4",
          },
        ],
      },
    };
  },
  methods: {
    playVideo() {
      this.player.play();
      this.getPercentage();
    },
    pauseVideo() {
      this.player.pause();
      clearInterval(this.percentageObj);
    },
    changeCurrentTime(time) {
      this.player.currentTime(time);
    },
    getPercentage() {
      const percentage = this.player.currentTime() / this.player.duration();
      this.percentageObj = setInterval(() => {
        this.$fireDb.ref().update({
          percentage: this.getPercentage(),
        });
      }, 3750);
      return percentage;
    },
  },
  watch: {
    videoPlaybackStatus() {
      this.videoPlaybackStatus ? this.playVideo() : this.pauseVideo();
    },
    time() {
      this.changeCurrentTime(this.time);
    },
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions);
    this.player.ready(() => {
      this.playerIsReady = true;
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    this.playerIsReady = false;
  },
};
</script>

<style lang="scss">
.video-js {
  height: 100%;
  width: 100vw;
  position: fixed;
}

/*
FILL WHOLE SCREEN
.vjs-tech {
  object-fit: cover;
}*/
</style>
