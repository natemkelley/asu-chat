<template>
  <div class="container">
    <div class="row mb-1">
      <div class="col s12 center-align">
        <h6 v-if="!loaded">LOADING</h6>
        <h6 v-else>
          {{ videoText }} has been
          <strong
            :class="{ 'red-text': !videoStatus, 'green-text': videoStatus }"
            >{{ loadedText }}</strong
          >
        </h6>
      </div>
    </div>

    <div v-show="videoStatus" class="row">
      <div class="col m5 s12">
        <Timer :videoStatus="videoStatus" />
      </div>
      <div class="col m4 s12">
        <Playback
          :videoPlaybackStatus="videoPlaybackStatus"
          :videoTime="videoTime"
          :videoStatus="videoStatus"
          :percentage="percentage"
        />
      </div>
      <div class="col m3 s12">
        <Sounds />
      </div>
      <div class="col m12 s12">
        <Points :videoStatus="videoStatus" />
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
  layout: "admin",
  components: { Playback, Timer, Points, Sounds },
  data() {
    return {
      videoStatus: null,
      videoTime: 0,
      videoPlaybackStatus: null,
      percentage: 0,
      loaded: false,
    };
  },
  computed: {
    videoText() {
      return this.videoStatus ? `"${this.videoStatus}"` : "A video";
    },
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
        percentage,
      } = snapshot.val();
      this.videoStatus = videoStatus;
      this.videoTime = videoTime;
      this.videoPlaybackStatus = videoPlaybackStatus;
      this.percentage = percentage;
      this.loaded = true;
    });
  },
};
</script>

<style>
.container {
  width: 95%;
  max-width: 1050px;
}

.admin-area {
  height: 100vh;
  width: 100vw;
  background: white;
}
</style>

<style lang="scss">
.mb-1 {
  margin-bottom: 4px;
}
</style>
