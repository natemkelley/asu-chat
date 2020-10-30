<template>
  <Card>
    <div class="sound-icon" @click="playSound(ding)">
      <img :src="horn" />
      Ding
    </div>

    <div class="sound-icon" @click="playSound(negative)">
      <img :src="horn" />
      Negative
    </div>

    <div class="sound-icon" @click="playSound(timer)">
      <img :src="horn" />
      Timer
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import cloneDeep from "@/node_modules/lodash/cloneDeep";

import horn from "@/assets/images/horn.png";

export default {
  components: { Card },
  data() {
    return {
      ding: "ding",
      negative: "negative",
      timer: "timer",
      horn: horn,
    };
  },
  methods: {
    async playSound(sound) {
      M.toast({
        html: `Sending "${sound}" to client`,
        displayLength: 3000,
      });
      await this.$fireDb.ref().update({
        sound: sound,
      });
      M.toast({ html: `Played "${sound}" on client`, displayLength: 3000 });
    },
    stopSound() {
      /*this.$fireDb.ref().update({
        sound: "",
      });
      M.toast({ html: `Stopping sound on client` });*/
    },
  },
};
</script>

<style lang="scss">
.sound-icon {
  display: flex;
  align-items: center;
  margin: 0px 0px;
  font-size: 30px;
  cursor: pointer;
  border-bottom: 3px solid black;
  padding-bottom: 5px;
  padding-top: 5px;
  img {
    height: 30px;
    margin-right: 10px;
    opacity: 0.85;
    margin-left: 5px;
  }
  &:hover {
    background: rgb(214, 236, 207);
  }
}
</style>
