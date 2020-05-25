<template>
  <div>
    <div class="indicator">
      <h2>{{ name }}</h2>
      <h2
        v-if="!canEdit"
        v-on:click="toggleInput()"
        :class="{ isAdmin: isAdmin, 'red-text': noTextYet }"
      >
        {{ displayText }}
      </h2>
      <input
        v-else
        type="text"
        v-model="newTextData"
        @blur="saveInput"
        v-on:keyup.enter="saveInput"
      />
    </div>
  </div>
</template>

<script>
import { createTextLevel } from "@/helpers/generators";
export default {
  name: "textIndicator",
  props: ["name", "indicatorToggles", "isAdmin", "roomId"],
  data() {
    return { changing: false, canEdit: false, newTextData: null };
  },
  computed: {
    firstText() {
      return this.indicatorToggles.find(
        (indicator) => indicator.type === "text"
      );
    },
    displayText() {
      console.log(this.noTextYet, this.isAdmin);
      if (this.noTextYet && this.isAdmin) return "NO TEXT";
      return !this.noTextYet ? this.firstText.level : "";
    },
    noTextYet() {
      return !this.firstText || !this.firstText.level.length;
    },
  },
  methods: {
    toggleInput() {
      this.newTextData = this.displayText;
      this.canEdit = true;
    },
    saveInput() {
      if (!this.isAdmin || this.changing) return;
      this.changing = true;
      console.log("saving");

      const text = createTextLevel(this.newTextData);
      M.toast({
        html: "Saving Text Indicator",
        classes: "green darken-2 rounded",
      });
      this.$fireStore
        .collection("rooms")
        .doc(this.roomId)
        .collection("indicatorToggles")
        .add(text)
        .then(() => {
          setTimeout(() => {
            this.changing = false;
            this.canEdit = false;
          }, 150);
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
  input {
    width: 60%;
    border-bottom: 3px solid black;
    text-align: center;
    font-size: 30px;
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

.red-text {
  color: red;
}
</style>
