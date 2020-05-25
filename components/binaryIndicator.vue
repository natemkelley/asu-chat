<template>
  <div>
    <div class="indicator">
      <h2>{{ name }}</h2>
      <div
        v-on:click="toggleBinary()"
        class="toggle"
        :class="{ on: onToggle, isAdmin: isAdmin }"
      ></div>
    </div>
  </div>
</template>

<script>
import { createBinaryLevel } from "@/helpers/generators";
export default {
  name: "binaryIndicator",
  props: ["name", "indicatorToggles", "isAdmin", "roomId"],
  data() {
    return { changing: false };
  },
  computed: {
    firstBinary() {
      return this.indicatorToggles.find(
        (indicator) => indicator.type === "binary"
      );
    },
    onToggle() {
      return this.firstBinary ? this.firstBinary.level : true;
    },
  },
  methods: {
    toggleBinary() {
      if (!this.isAdmin || this.changing) return;
      this.changing = true;

      M.toast({
        html: "Saving Binary Indicator",
        classes: "green darken-2 rounded",
      });

      const binary = createBinaryLevel(this.onToggle);
      this.$fireStore
        .collection("rooms")
        .doc(this.roomId)
        .collection("indicatorToggles")
        .add(binary)
        .then(() => {
          this.changing = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.indicator {
  position: relative;
  padding: 10px 20px;
  height: 75px;
  border: 3px solid black;
  background: white;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 0;
    font-size: 30px;
    height: 30px;
  }
  .toggle {
    height: 40px;
    width: 40px;
    border: 3px solid black;
    border-radius: 50%;
    background: red;
    transition: 0.15s all ease;
  }
  .on {
    background: rgba(35, 247, 35, 0.582);
  }

  .isAdmin {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
    &:active,
    &:focus {
      transform: scale(0.9);
    }
  }
}
</style>
