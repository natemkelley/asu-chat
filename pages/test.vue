<template>
  <div>
    TEST PAGE
    <TSComponent />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import TSComponent from "@/components/TSComponent.vue";

@Component({ components: { TSComponent } })
export default class TestPage extends Vue {
  count = 0;

  @Emit()
  addToCount(n: number) {
    this.count += n;
  }
}
</script>
