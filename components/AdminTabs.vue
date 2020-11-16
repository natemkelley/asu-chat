<template>
  <div class="row">
    <div class="col s12">
      <ul class="tabs tabs-fixed-width clickable">
        <li
          class="tab clickable col s3"
          v-for="mission in missionData"
          :key="mission.missionName"
          @click="newTabSelected(mission)"
        >
          <a>{{ mission.missionName }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["missionData"],
  mounted() {
    const options = {};
    const el = document.querySelector(".tabs");
    M.Tabs.init(el, options);

    this.newTabSelected(this.missionData[0]);
  },
  methods: {
    newTabSelected(mission) {
      this.$emit("setMissionData", mission);
    },
  },
};
</script>

<style scoped>
.tab,
.tabs,
a,
.clickable {
  cursor: pointer !important;
}
</style>
