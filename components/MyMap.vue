<template>
  <div class="map-container">
    <l-map
      ref="map"
      :min-zoom="minZoom"
      :crs="crs"
      style="height: 500px; width: 100%;"
      @click="onMapClick"
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
    <div @click="undoClick" class="undo">UNDO</div>
  </div>
</template>

<script>
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
  components: {
    LIcon,
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    LPolyline,
  },
  data() {
    return {
      url: mission3map,
      bounds: [
        [0, 0],
        [750, 1000],
      ],
      minZoom: -2,
      crs: CRS.Simple,
      icons: [],
    };
  },
  mounted() {
    this.$refs.map.mapObject.setView([380, 500], 0.25);
  },
  methods: {
    onMapClick(e) {
      const iconConfig = {
        ...e.latlng,
      };

      this.icons.push(iconConfig);
    },
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
        url:
          "https://img.pngio.com/person-icon-png-50-px-person-png-1600_1600.png",
      };

      const newIcons = cloneDeep(this.icons);
      newIcons[foundIconIndex] = newIcon;
      this.icons = newIcons;
    },
    undoClick() {
      if (this.icons.length) {
        this.icons.pop();
      }
    },
  },
};
</script>

<style lang="scss">
.map-container {
  position: relative;
}

#map {
  height: 580px;
}

.undo {
  position: absolute;
  top: 0;
  z-index: 9999;
  background: white;
  padding: 10px;
  border-radius: 10px;
  right: 0;
  margin: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.562);
}
</style>
