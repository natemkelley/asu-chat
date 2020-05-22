<template>
  <div style="margin-top:16px">
    <div class="input-field col s12">
      <select multiple v-model="type">
        <option value="" disabled selected>Choose your option</option>
        <option value="battery">Battery</option>
        <option value="stuck">Stuck</option>
        <option value="blockage">Blockage</option>
      </select>
      <label>What indicators do you want in this room?</label>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["org"],
  data() {
    return { type: [] };
  },
  methods: {},
  watch: {
    type() {
      this.$emit("updateIndicators", this.type);
    },
  },
  mounted() {
    var elems = this.$el.querySelectorAll("select");
    M.FormSelect.init(elems);
  },
};
</script>

<style scoped lang="scss">
.row.toggle {
  margin-bottom: 5px;
}
.toggle p {
  margin-top: 0;
}

.chips.input-field {
  margin-top: 0;
}

.chips {
  margin-bottom: 20px;
}
</style>

<style>
.chips .input {
  width: 160px !important;
}
</style>
