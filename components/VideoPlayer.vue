<template>
  <div>
    <video ref="videoPlayer" class="video-js" id="myVideo" muted="muted"></video
    >-->
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: { src: String, videoPlaybackStatus: Boolean },
  data() {
    return {
      percentageObj: null,
      player: null,
    };
  },
  methods: {
    playVideo() {
      this.player.play();
      this.startCalculatingPercentage();
    },
    pauseVideo() {
      for (let index = 0; index < 5; index++) {
        this.player.pause();
      }

      clearInterval(this.percentageObj);
    },
    startCalculatingPercentage() {
      clearInterval(this.percentageObj);
      this.percentageObj = setInterval(() => {
        const percentage = this.player.currentTime / this.player.duration;
        this.$fireDb.ref().update({
          percentage: percentage.toFixed(3),
          videoTime: this.player.currentTime,
        });
      }, 1000);
    },
  },
  watch: {
    videoPlaybackStatus() {
      this.videoPlaybackStatus ? this.playVideo() : this.pauseVideo();
    },
  },
  mounted() {
    this.player = this.$refs.videoPlayer;
    this.player.src = this.src;
    this.player.type = "video/mp4";
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
