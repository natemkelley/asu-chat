<template>
  <div>
    <div class="battery">
      <div class="level" :style="{ width: `${batteryLevel}%` }">
        <h2 v-if="!changing" @click="openChangeLevel()">{{ batteryLevel }}%</h2>
        <input
          v-else
          type="number"
          min="0"
          max="100"
          v-model="newBatteryLevel"
          @change="setBatteryLevel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { createBatteryLevel } from "@/helpers/generators";

export default {
  name: "battery",
  props: ["indicatorToggles", "isAdmin", "roomId"],
  computed: {
    batteryLevel() {
      return this.firstBattery ? this.firstBattery.level : 100;
    },
    firstBattery() {
      return this.indicatorToggles.find(
        (indicator) => indicator.type === "battery"
      );
    },
  },
  watch: {
    batteryLevel() {
      this.newBatteryLevel = this.batteryLevel;
    },
  },
  data() {
    return {
      changing: false,
      newBatteryLevel: 20,
    };
  },
  methods: {
    openChangeLevel() {
      if (!this.isAdmin) return;
      this.changing = true;
    },
    setBatteryLevel(here) {
      if (this.newBatteryLevel > 100) this.newBatteryLevel = 100;
      if (this.newBatteryLevel < 0) this.newBatteryLevel = 0;

      M.toast({
        html: "Saving Battery Indicator",
        classes: "green darken-2 rounded",
      });

      const level = createBatteryLevel(this.newBatteryLevel);
      this.$fireStore
        .collection("rooms")
        .doc(this.roomId)
        .collection("indicatorToggles")
        .add(level)
        .then(() => {
          this.changing = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.battery {
  position: relative;
  height: 75px;
  border: 3px solid black;
  background: white;
  border-radius: 12px;
  h2,
  input {
    position: absolute;
    width: 100%;
    text-align: center;
    margin: 0;
    top: 25%;
    font-size: 30px;
  }
  input {
    width: 50%;
    margin-left: 25%;
    border-bottom: 3px solid black;
  }
  .level {
    background: rgba(35, 247, 35, 0.582);
    height: 100%;
    width: 100%;
    border-radius: 1px;
    transition: all 1.25s ease;
  }
}
</style>
