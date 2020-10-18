<template>
  <video ref="videoPlayer" class="video-js " muted="muted"></video>
</template>

<script>
import videojs from "video.js";
import videojsCSS from "video.js/dist/alt/video-js-cdn.css";

export default {
  name: "VideoPlayer",
  data() {
    return {
      player: null,
      videoOptions: {
        autoplay: false,
        controls: false,
        preload: true,
        width: "100vw",
        sources: [
          {
            src:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            type: "video/mp4",
          },
        ],
      },
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions);
    this.player.ready(() => {
      this.playVideo();
    });

    var myPlayer = this.player;

    setInterval(() => {
      var howMuchIsDownloaded = this.player.bufferedPercent();
      var lengthOfVideo = this.player.duration();
      this.player.paused() ? this.playVideo() : this.pauseVideo();
      console.log("howMuchIsDownloaded", howMuchIsDownloaded);
    }, 2000);
  },
  methods: {
    playVideo() {
      this.player.play();
    },
    pauseVideo() {
      console.log("pause");
      this.player.pause();
    },
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="scss">
.video-js {
  height: 100%;
  width: 100vw;
}

/*
FILL WHOLE SCREEN
.vjs-tech {
  object-fit: cover;
}*/
</style>
