<template>
  <div class="container">
    <div class="row mb-1">
      <div class="col s12 center-align">
        <h6 v-if="!loaded">LOADING</h6>
        <h6 v-else>
          {{ videoText }} has
          <strong
            :class="{ 'red-text': !videoStatus, 'green-text': videoStatus }"
            >{{ loadedText }}</strong
          >
        </h6>
      </div>
    </div>

    <AdminTabs :missionData="missionData" @setMissionData="setMissionData" />
    <AdminTabPage v-if="selectedMission" :mission="selectedMission" />
  </div>
</template>
m
<script>
import Playback from "@/components/Playback.vue";
import Timer from "@/components/Timer.vue";
import Points from "@/components/Points.vue";
import Sounds from "@/components/Sounds.vue";
import AdminTabs from "@/components/AdminTabs.vue";
import AdminTabPage from "@/components/AdminTabPage.vue";
import { missionConfig } from "@/helpers/missionConfig";

export default {
  layout: "admin",
  components: { Playback, Timer, Points, Sounds, AdminTabs, AdminTabPage },
  data() {
    return {
      videoStatus: null,
      videoTime: 0,
      videoPlaybackStatus: null,
      percentage: 0,
      loaded: false,
      missionData: missionConfig,
      selectedMission: null,
    };
  },
  computed: {
    videoText() {
      return this.videoStatus ? `"${this.videoStatus}"` : "A video";
    },
    loadedText() {
      return this.videoStatus ? "been loaded" : "not been loaded";
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
  methods: {
    setMissionData(mission) {
      this.selectedMission = mission;
    },
  },
};
</script>

<style>
.container {
  width: 95%;
  max-width: 1350px;
  min-width: 970px;
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
