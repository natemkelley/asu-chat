<template>
  <div>
    <div ref="json"></div>
  </div>
</template>

<script>
import JSONFormatter from "json-formatter-js";

export default {
  props: ["json"],
  mounted() {
    const myJSON = this.json;

    const formatter = new JSONFormatter(myJSON);

    this.$refs.json.appendChild(formatter.render());
  },
};
</script>
