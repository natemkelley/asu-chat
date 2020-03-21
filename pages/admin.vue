<template>
  <div class="container push-top">
    <div class="row tabs-row">
      <div class="col s12">
        <ul class="tabs tabs-fixed-width clickable">
          <li class="tab col s3">
            <NuxtLink to="/admin/createRoom">Create Room</NuxtLink>
          </li>
          <li class="tab col s3">
            <NuxtLink class="" to="/admin/activeRooms">Active Rooms</NuxtLink>
          </li>
          <li class="tab col s3">
            <NuxtLink class="" to="/admin/pastRooms">Past Rooms</NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <NuxtChild />
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      tabs: null
    };
  },
  mounted() {
    let tabs = this.$el.querySelectorAll(".tabs");

    //handle tabs
    let pathArr = window.location.pathname.split("/");
    let currentRoute = pathArr[pathArr.length - 1];
    let tabsLI = this.$el.querySelectorAll(".tab");

    if (currentRoute == "createRoom") {
      tabsLI[0].getElementsByTagName('a')[0].classList.add("active");
    }
    if (currentRoute == "activeRooms") {
      tabsLI[1].getElementsByTagName('a')[0].classList.add("active");
    }
    if (currentRoute == "pastRooms") {
      tabsLI[2].getElementsByTagName('a')[0].classList.add("active");
    }

        this.tabs = M.Tabs.init(tabs)

    console.log(tabsLI);
  },
  beforeMount() {
    let pathArr = window.location.pathname.split("/");
    let currentRoute = pathArr[pathArr.length - 1];
    if (currentRoute == "admin") {
      this.$router.push({
        path: "/admin/createRoom"
      });
    }
  }
};
</script>

<style scoped>
.active {
  background: rgba(255, 0, 55, 0.102) !important;
}

.tabs-row {
  box-shadow: 0 4px 2px -2px rgba(128, 128, 128, 0.185);
}
</style>
