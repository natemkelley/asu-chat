<template>
  <div class="">
    <h3>Extra Points Fields</h3>
    <h5>For example: time events</h5>
    <table class="extra">
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="point in pointFields" :key="point.index">
          <td>{{ point.index }}</td>
          <td class="name">
            <input v-model="pointFields[point.index].name" />
          </td>
          <td>
            <span @click="pointsClick(point.index, false)">-</span>
            {{ point.points }}
            <span @click="pointsClick(point.index, true)">+</span>
          </td>
        </tr>
      </tbody>
    </table>

    <a class="waves-effect waves-light btn green" @click="addRow">Add row</a>
    <a class="waves-effect waves-light btn red" @click="subtractRow"
      >Subtract row</a
    >
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      pointFields: [],
    };
  },
  methods: {
    pointsClick(foundIconIndex, plus) {
      const foundIcon = this.pointFields[foundIconIndex];
      const newPoints = plus ? foundIcon.points + 1 : foundIcon.points - 1;
      const newIcon = {
        ...foundIcon,
        points: newPoints,
      };

      const newIcons = cloneDeep(this.pointFields);
      newIcons[foundIconIndex] = newIcon;
      this.pointFields = newIcons;
    },
    addRow() {
      const defaultRow = {
        index: this.pointFields.length,
        points: 5,
        name: "Default",
      };
      this.pointFields.push(defaultRow);
    },
    subtractRow() {
      this.pointFields.pop();
    },
  },
  watch: {
    pointFields() {
      this.$emit("pointFieldsChanged", this.pointFields);
    },
  },
};
</script>

<style lang="scss" scoped>
.extra {
  margin: 20px;
}

.name {
  max-width: 150px;
}

.btn {
  margin: 10px;
}
</style>
