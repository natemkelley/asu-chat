<template>
  <div>
    <nav>
      <div class="nav-wrapper asu-gold">
        <div href="#" class="brand-logo center">
          <img class="image" :src="hand" /> Admin Area
        </div>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><a href="/">Participant View</a></li>
        </ul>
      </div>
    </nav>
    <nuxt />
  </div>
</template>

<script>
import hand from "@/assets/images/pitchfork_hand.png";

export default {
  data() {
    return {
      hand: hand,
    };
  },
};
</script>

<style lang="scss">
nav {
  margin-bottom: 10px;
  .brand-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    //width: 100%;
    .image {
      height: 40px;
    }
  }
}

.asu {
  &-maroon {
    background: rgb(136, 25, 51);
    &:hover {
      background: rgb(136, 25, 51);
      color: white;
    }
  }
  &-gold {
    background: rgb(237, 175, 64) !important;
    &:hover {
      background: rgb(237, 175, 64) !important;
      color: black;
    }
  }
}
</style>
