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

    <AdminTabs
      v-if="missionData"
      :missionData="missionData"
      @setMissionData="setMissionData"
    />

    <div v-if="selectedMission">
      <component
        :key="selectedMission.uuid"
        :is="adminPage"
        :mission="selectedMission"
        :videoStatus="videoStatus"
        :videoTime="videoTime"
        :videoPlaybackStatus="videoPlaybackStatus"
        :percentage="percentage"
      ></component>
    </div>
  </div>
</template>

<script>
import AdminTabs from "@/components/AdminTabs.vue";
import AdminTabPage from "@/components/AdminTabPage.vue";

export default {
  layout: "admin",
  components: { AdminTabs, AdminTabPage },
  data() {
    return {
      videoStatus: null,
      videoTime: 0,
      videoPlaybackStatus: null,
      percentage: 0,
      loaded: false,
      missions: [],
      selectedMission: {},
      adminPage: null,
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
      const data = snapshot.val();
      const {
        videoStatus,
        videoTime,
        videoPlaybackStatus,
        percentage,
        missions,
      } = data;
      this.videoStatus = videoStatus;
      this.videoTime = videoTime;
      this.videoPlaybackStatus = videoPlaybackStatus;
      this.percentage = percentage;
      this.missionData = missions;
      this.loaded = true;
    });
  },
  methods: {
    setMissionData(mission) {
      this.selectedMission = mission;
      this.adminPage = AdminTabPage;
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
