<template>
  <Card class="points">
    <div class="points-input">
      <div class="arrows">
        <a
          class="point-btn btn-floating waves-effect waves-light red darken-1"
          @click="subtractPoints(1)"
          >-1</a
        >
        <a
          class="point-btn btn-floating waves-effect waves-light red darken-2"
          @click="subtractPoints(2)"
          >-2</a
        >
        <a
          class="point-btn btn-floating waves-effect waves-light green darken-1"
          @click="addPoints(5)"
          >+5</a
        >
        <a
          class="point-btn btn-floating waves-effect waves-light green darken-2"
          @click="addPoints(10)"
          >+10</a
        >
      </div>
      <div>
        <input type="number" v-model="total" />
      </div>
    </div>

    <div class="divider"></div>

    <div class="points-output center-align">
      {{ pointsOutput }}
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  components: { Card },
  data() {
    return {
      points: 0,
      total: 100,
    };
  },
  computed: {
    pointsOutput() {
      return `${this.points}/${this.total}`;
    },
  },
  methods: {
    addPoints(number) {
      this.points = this.points + number;
    },
    subtractPoints(number) {
      this.points = this.points - number;
    },
    updatePoints() {
      this.$fireDb.ref().update({
        points: this.pointsOutput,
      });
    },
  },
  watch: {
    total() {
      this.updatePoints();
    },
    points() {
      this.updatePoints();
    },
  },
};
</script>

<style lang="scss" scoped>
.points-input {
  font-size: 30px;
  display: flex;
  justify-content: space-between;

  .arrows {
    width: 70%;
    margin-right: 15px;
  }

  input {
    text-align: center;
    font-size: 30px;
    width: 150px;
    border-bottom: 3px solid black;
  }
}

.points-output {
  font-size: 90px;
}

.point-btn {
  text-align: center;
}

.material-icons {
  cursor: pointer;
  font-size: 35px;
  &:hover {
    background: rgb(236, 236, 236);
    border-radius: 12px;
  }
}
</style>
