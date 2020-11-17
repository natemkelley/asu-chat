<template>
  <Card class="points">
    <div class="points-output center-align">
      <transition name="bounce" mode="out-in">
        <span :key="points" :style="{ marginRight: '5px' }">{{ points }}</span>
      </transition>

      <input type="number" v-model="total" />
    </div>
    <div class="divider mb-2"></div>

    <div class="row">
      <div class="col m6 s12 " :style="{ borderRight: '3px solid black' }">
        <div class="points-section">
          <h2>Robot Malfunctions</h2>
          <PointsButton
            points="-2"
            label="Problem Not Acknowledged"
            :red="true"
            @click.native="subtractPoints(2)"
          />
          <PointsButton
            points="-1"
            label="Cause Incorrect"
            :red="true"
            @click.native="subtractPoints(1)"
          />
        </div>
        <div class="points-section">
          <h2>Victim</h2>
          <PointsButton
            points="-2"
            label="Victim Not Identified"
            :red="true"
            @click.native="subtractPoints(2)"
          />
          <PointsButton
            points="-1"
            label="Wrong Color"
            :red="true"
            @click.native="subtractPoints(1)"
          />
          <PointsButton
            points="-1"
            label="Wrong Location"
            :red="true"
            @click.native="subtractPoints(1)"
          />
        </div>
        <div class="points-section">
          <h2>Environmental Changes</h2>
          <PointsButton
            points="-2"
            label="Change Not Identified"
            :red="true"
            @click.native="subtractPoints(2)"
          />
          <PointsButton
            points="-1"
            label="Wrong Change Identified"
            :red="true"
            @click.native="subtractPoints(1)"
          />
        </div>
        <div class="points-section">
          <h2>Environmental Changes</h2>
          <PointsButton
            points="-10"
            label="Mission Time"
            :red="true"
            @click.native="subtractPoints(10)"
          />
        </div>
      </div>
      <div class="col m6 s12 ">
        <div class="points-section">
          <h2>Robot Malfunctions</h2>
          <PointsButton
            points="+5"
            label="Problem Acknowledged"
            @click.native="addPoints(5)"
          />
          <PointsButton
            points="+10"
            label="Cause Correct"
            @click.native="addPoints(10)"
          />
        </div>
        <div class="points-section">
          <h2>Victim</h2>
          <PointsButton
            points="+10"
            label="Victim Identified"
            @click.native="addPoints(10)"
          />
          <PointsButton
            points="+5"
            label="Correct Color"
            @click.native="addPoints(5)"
          />
          <PointsButton
            points="+5"
            label="Correct Location"
            @click.native="addPoints(5)"
          />
        </div>
        <div class="points-section">
          <h2>Environmental Changes</h2>
          <PointsButton
            points="+5"
            label="Changes Identified"
            @click.native="addPoints(5)"
          />
          <PointsButton
            points="+10"
            label="Correct Change Indentified"
            @click.native="addPoints(10)"
          />
        </div>
        <div class="points-section">
          <h2>Mission Time</h2>
          <PointsButton
            points="+15"
            label="Finish on Time"
            @click.native="addPoints(15)"
          />
          <PointsButton
            points="+5"
            label="Finish Early"
            @click.native="addPoints(5)"
          />
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import PointsButton from "@/components/PointsButton.vue";

export default {
  components: { Card, PointsButton },
  data() {
    return {
      points: 0,
      total: 100,
    };
  },
  methods: {
    addPoints(number) {
      this.points = this.points + number;
    },
    subtractPoints(number) {
      this.points = this.points - number;
    },
    updatePoints() {
      const pointsOutput = `${this.points}/${this.total}`;
      this.$fireDb.ref().update({
        points: pointsOutput,
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
  align-items: center;

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
  font-size: 60px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    font-size: 60px !important;
    width: 200px;
    text-align: center;
    margin-bottom: -8px;
    padding-bottom: 8px;
    border-bottom: 3px solid;
  }
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

.points-section {
  border-top: 3px solid black;
  margin-top: 5px;
  padding-top: 10px;
  &:first-child {
    border: none;
  }

  h2 {
    margin: 0;
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 30px;
    text-align: left;
  }
}

.col {
  padding: 5px 20px;
}

.mb-2 {
  margin-bottom: 16px;
}
</style>
