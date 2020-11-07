<template>
  <div>
    TS Component

    <div class="test" @click="addToCount">{{ count }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component
export default class YourComponent extends Vue {
  count = 0;

  @Emit()
  addToCount(n: number) {
    setInterval(() => {
      this.count++;
    }, 1);
  }
}
</script>

<style lang="scss" scoped>
.test {
  padding: 50px;
  background: greenyellow;
}
</style>
