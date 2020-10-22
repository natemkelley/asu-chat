<template>
  <div class="container">
    <div class="title">
      <h2 class="center-align">ADMIN AREA</h2>
    </div>

    <div class="row">
      <div class="col s12 center-align">
        <h6>
          A video has been
          <strong
            :class="{ 'red-text': !videoStatus, 'green-text': videoStatus }"
            >{{ loadedText }}</strong
          >
        </h6>
      </div>
    </div>

    <div class="row">
      <div class="col m6 s12">
        <Timer :videoStatus="videoStatus" />
      </div>
      <div class="col m6 s12">
        <Playback
          :videoPlaybackStatus="videoPlaybackStatus"
          :videoTime="videoTime"
          :videoStatus="videoStatus"
          :currentVideoTime="currentVideoTime"
          :percentage="percentage"
        />
      </div>
      <div class="col m6 s12">
        <Points :videoStatus="videoStatus" />
      </div>
      <div class="col m6 s12">
        <Sounds />
      </div>
    </div>
  </div>
</template>

<script>
import Playback from "@/components/Playback.vue";
import Timer from "@/components/Timer.vue";
import Points from "@/components/Points.vue";
import Sounds from "@/components/Sounds.vue";

export default {
  components: { Playback, Timer, Points, Sounds },
  data() {
    return {
      videoStatus: null,
      videoTime: 0,
      videoPlaybackStatus: null,
      currentVideoTime: null,
      percentage: 0,
    };
  },
  computed: {
    loadedText() {
      return this.videoStatus ? "loaded" : "not been loaded";
    },
  },
  created() {
    this.$fireDb.ref().on("value", (snapshot) => {
      this.initializing = false;
      const {
        videoStatus,
        videoTime,
        videoPlaybackStatus,
        currentVideoTime,
        percentage,
      } = snapshot.val();
      this.videoStatus = videoStatus;
      this.videoTime = videoTime;
      this.videoPlaybackStatus = videoPlaybackStatus;
      this.currentVideoTime = currentVideoTime;
      this.percentage = percentage;
    });
  },
};
</script>

<style>
.container {
  width: 90%;
}

.admin-area {
  height: 100vh;
  width: 100vw;
  background: white;
}
</style>
