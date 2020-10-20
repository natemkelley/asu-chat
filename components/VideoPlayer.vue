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
      console.log("play called");
      this.player.play();
    },
    pauseVideo() {
      console.log("paused called");
      this.player.pause();
    },
    changeCurrentTime(time) {
      console.log("time called", time);
      this.player.currentTime(time);
    },
    getDuration() {
      return this.player.duration();
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
