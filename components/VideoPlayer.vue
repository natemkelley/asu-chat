<template>
  <div>
    <video ref="videoPlayer" class="video-js" id="myVideo" muted="muted"></video
    >-->
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: { src: String, videoPlaybackStatus: Boolean, time: Number },
  data() {
    return {
      percentageObj: null,
      player: null,
    };
  },
  methods: {
    playVideo() {
      this.player.play();
      //this.getPercentage();
    },
    pauseVideo() {
      for (let index = 0; index < 10; index++) {
        const vid = document.getElementById("myVideo");
        vid.pause();
        this.player.pause();
        console.log("pause");
      }

      clearInterval(this.percentageObj);
    },
    changeCurrentTime(time) {
      this.player.currentTime(time);
    },
    getPercentage() {
      const percentage = this.player.currentTime / this.player.duration;
      clearInterval(this.percentageObj);

      this.percentageObj = setInterval(() => {
        console.log(this.player.currentTime());
        this.$fireDb.ref().update({
          percentage: percentage,
          videoTime: this.player.currentTime(),
        });
      }, 1000);
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
    this.player = this.$refs.videoPlayer;
    this.player.src = this.src;
    this.player.type = "video/mp4";
  },
  beforeDestroy() {
    alert("before destroy");
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
