<template>
  <Card class="filler">
    <div class="points">POINTS: {{ points }}</div>

    <div class="map-container">
      <l-map
        ref="map"
        :min-zoom="minZoom"
        :crs="crs"
        :options="{ scrollWheelZoom: false, zoomDelta: 0.35, zoomSnap: 0 }"
        style="height: 500px; width: 100%;"
      >
        <LImageOverlay :url="url" :bounds="bounds" />
        <l-marker
          v-for="icon in icons"
          :key="icon.name"
          :lat-lng="icon"
          @click="iconClicked"
        >
          <l-icon v-if="icon.url" :icon-url="icon.url" />
        </l-marker>
      </l-map>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import leaflet from "leaflet";
import { CRS } from "leaflet";
import { latLngBounds, latLng } from "leaflet";
import {
  LMap,
  LImageOverlay,
  LMarker,
  LPopup,
  LPolyline,
  LTileLayer,
  LIcon,
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

import mission3map from "@/assets/images/mission3map.png";
import { Icon } from "leaflet";
import { cloneDeep } from "lodash";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  props: ["mission"],
  components: {
    LIcon,
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    LPolyline,
    Card,
  },
  data() {
    return {
      bounds: [
        [0, 0],
        [750, 1000],
      ],
      minZoom: -2,
      crs: CRS.Simple,
    };
  },
  mounted() {
    this.$refs.map.mapObject.setView([380, 500], -0.25);
  },
  methods: {
    iconClicked(e) {
      const { latlng } = e;
      const foundIconIndex = this.icons.findIndex(
        (icon) => icon.lng === latlng.lng && icon.lat === latlng.lat
      );
      const foundIcon = this.icons.find(
        (icon) => icon.lng === latlng.lng && icon.lat === latlng.lat
      );

      console.log(foundIconIndex, foundIcon);

      const newIcon = {
        ...foundIcon,
      };

      /*const newIcons = cloneDeep(this.icons);
      newIcons[foundIconIndex] = newIcon;
      this.icons = newIcons;*/
    },
  },
  computed: {
    points() {
      return "0/100";
    },
    icons() {
      return this.mission.mapEvents || [];
    },
    extraPoints() {
      return this.mission.extraPoints || [];
    },
    url() {
      return this.mission.selectedMap.map || mission3map;
    },
  },
};
</script>

<style lang="scss">
.points {
  font-size: 38px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
  font-weight: 500;
}

.map-container {
  position: relative;
}

#map {
  height: 580px;
}

.filler {
  padding-bottom: 30px;
}
</style>
