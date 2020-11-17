<template>
  <div>
    <div v-if="!loaded">Mission not loaded yet...</div>
    <div v-if="loaded && !missionToDelete.length">
      No missions to delete
    </div>
    <ul v-show="loaded" class="collapsible">
      <li v-for="mission in missionToDelete" :key="mission.uuid">
        <div class="collapsible-header space-between">
          <div>
            <i class="material-icons">filter_drama</i>{{ mission.missionName }}
          </div>
          <div class="btn red" @click="deleteMission(mission)">DELETE</div>
        </div>
        <div class="collapsible-body">
          <div class="col s4">{{ mission.missionName }}</div>
          <div class="col s8">
            <ViewThisJSON :json="mission" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ViewThisJSON from "@/components/ViewThisJSON.vue";

export default {
  props: ["loaded", "missionToDelete"],
  components: { ViewThisJSON },
  methods: {
    async deleteMission(dMission) {
      const mergedMissions = this.missionToDelete.filter(
        (mission) => mission.uuid !== dMission.uuid
      );

      var r = confirm("Are you sure?");
      if (r == true) {
        await this.$fireDb.ref().update({
          missions: [...mergedMissions],
        });
        this.getMissions();
      }
    },
    getMissions() {
      this.$emit("getMissions", true);
    },
  },
};
</script>

<style scoped>
.space-between {
  justify-content: space-between;
}
</style>
