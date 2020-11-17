<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">CREATE/DELETE MISSIONS</a>
      </div>
    </nav>

    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s3">
          <a class="active" href="#test2">CREATE MISSIONS</a>
        </li>
        <li class="tab col s3"><a href="#test1">DELETE MISSIONS</a></li>
      </ul>
    </div>

    <div id="test1" class="mission-create col s12">
      <DeleteMission
        :loaded="loaded"
        :missionToDelete="missionToDelete"
        @getMissions="getMissions"
      />
    </div>

    <div class="mission-create" id="test2">
      <div class="top-settings">
        <div class="mission-name">
          Mission Name:
          <span>
            <input
              v-model="missionName"
              id="email_inline"
              type="text"
              class="validate"
          /></span>
        </div>
        <div class="mission-name">
          Total Points in Mission:
          <span>
            <input
              v-model="totalPoints"
              id="email_inline"
              type="number"
              class="validate"
          /></span>
        </div>
      </div>

      <CreateMap
        class="createMap"
        @newIcons="newIcons"
        @selectedMap="selectedMapChange"
      />

      <CreatExtraPoints
        class="createMap"
        @pointFieldsChanged="pointFieldsChanged"
      />

      <div class="createMap timer-settings">
        TIMER SETTINGS:
        <div>
          <vue-timepicker
            class="time"
            hide-clear-button
            v-model="yourTimeValue"
            format="mm:ss"
            input-class="myTime"
            input-width="100%"
            auto-scroll
            second-interval="5"
            @change="changeTimeHandler"
          ></vue-timepicker>
        </div>
      </div>

      <CreateStoppages class="createMap" @stoppagesChanged="stopChanged" />

      <div class="row">
        <a @click="saveMission" class="button waves-effect waves-light btn">{{
          saveText
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import CreateMap from "@/components/CreateMap.vue";
import CreateStoppages from "@/components/CreateStoppages.vue";
import CreatExtraPoints from "@/components/CreateExtraPoints.vue";
import VueTimepicker from "vue2-timepicker";
import DeleteMission from "@/components/createMissions/deleteMission.vue";
import { v4 as uuidv4 } from "uuid";
import "vue2-timepicker/dist/VueTimepicker.css";

const prettyPrintJson = require("pretty-print-json");

export default {
  components: {
    CreateMap,
    CreatExtraPoints,
    VueTimepicker,
    DeleteMission,
    CreateStoppages,
  },
  data() {
    return {
      missionName: "",
      iconData: [],
      pointsFields: [],
      yourTimeValue: {
        HH: "0",
        mm: "25",
        ss: "00",
      },
      timerTime: 0,
      totalPoints: 100,
      missionToDelete: [],
      uuid: uuidv4(),
      loaded: false,
      saving: false,
      selectedMap: null,
      stoppagesChanged: [],
    };
  },
  methods: {
    newIcons(newIcons) {
      this.iconData = newIcons;
    },
    saveMission() {
      const missionData = {
        missionName: this.missionName,
        totalPoints: this.totalPoints,
        extraPoints: this.pointsFields,
        mapEvents: this.iconData,
        uuid: this.uuid,
        timerTime: this.timerTime,
        selectedMap: this.selectedMap,
        stoppagesChanged: this.stoppagesChanged,
      };

      this.saving = true;

      this.$fireDb
        .ref("missions")
        .once("value")
        .then(async (snapshot) => {
          const currentMissions = snapshot.val() || [];

          const mergedMissions = currentMissions.filter(
            (mission) => mission.uuid !== this.uuid
          );

          await this.$fireDb.ref().update({
            missions: [...mergedMissions, missionData],
          });
          M.toast({ class: "green", html: `${this.missionName} was saved` });
          this.getMissions();
          this.saving = false;
        });
    },
    pointFieldsChanged(pointsFields) {
      this.pointsFields = pointsFields;
    },
    changeTimeHandler({ data }) {
      const mm = data.mm * 60;
      const ss = data.ss;
      this.timerTime = Number(mm) + Number(ss);
    },
    getMissions() {
      this.$fireDb
        .ref("missions")
        .once("value")
        .then(async (snapshot) => {
          this.missionToDelete = snapshot.val() || [];

          if (!this.loaded) {
            this.loaded = true;
            this.createMaterialize();
          }
        });
    },
    getJSONHTML(data) {
      return prettyPrintJson.toHtml(data);
    },
    createMaterialize() {
      const options = {};
      M.Tabs.init(document.querySelector(".tabs"), options);

      var elems = document.querySelectorAll(".collapsible");
      M.Collapsible.init(elems, options);
    },
    selectedMapChange(selectedMap) {
      this.selectedMap = selectedMap;
    },
    stopChanged(stoppagesChanged) {
      this.stoppagesChanged = stoppagesChanged;
    },
  },
  mounted() {
    this.getMissions();
    this.createMaterialize();
  },
  computed: {
    saveText() {
      return this.saving ? "SAVING" : "CLICK HERE TO SAVE";
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.mission-create {
  padding: 10px;
  margin-bottom: 50px;
}

form {
  font-size: 20px;
  input {
    font-size: 20px !important;
  }
}

.mission-name {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 25px !important;
  span {
    margin-left: 10px;
  }
  margin-bottom: 20px;
}

.button {
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.createMap {
  padding: 10px;
  padding-bottom: 30px;
  border: 3px solid black;
  margin-bottom: 40px;
}

.timer-settings {
  display: flex;
  justify-content: center;
  align-items: center;
  .time {
    max-width: 300px;
    margin-top: 10px;
  }
}

.tabs .tab a:hover,
.tabs .tab a.active {
  background-color: transparent;
  color: #d8555a;
  background: rgb(247, 189, 189);
}
</style>
