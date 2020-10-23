<template>
  <Card class="points">
    <div class="points-input">
      <div class="arrows">
        <i class="material-icons" @click="subtractPoints"
          >keyboard_arrow_down</i
        >
        <span>{{ points }}</span>
        <i class="material-icons" @click="addPoints">keyboard_arrow_up</i>
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
    addPoints() {
      this.points++;
    },
    subtractPoints() {
      this.points--;
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 120px;
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

.material-icons {
  cursor: pointer;
  font-size: 35px;
  &:hover {
    background: rgb(236, 236, 236);
    border-radius: 12px;
  }
}
</style>
