<template>
  <div class="map-container">
    <l-map
      ref="map"
      :min-zoom="minZoom"
      :crs="crs"
      style="height: 500px; width: 100%;"
      @click="createIcon"
    >
      <LImageOverlay :url="url" :bounds="bounds" />
      <l-marker v-for="icon in icons" :key="icon.name" :lat-lng="icon">
        <l-icon v-if="icon.url" :icon-url="icon.url" />
      </l-marker>
    </l-map>
    <div @click="undoClick" class="undo">UNDO</div>

    <div class="choose-icon">
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Points</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="icon in icons" :key="icon.index">
            <td>{{ icon.index }}</td>
            <td>{{ icon.lat }}</td>
            <td>{{ icon.lng }}</td>
            <td>
              <span @click="pointsClick(icon.index, false)">-</span>
              {{ icon.points }}
              <span @click="pointsClick(icon.index, true)">+</span>
            </td>
            <td @click="iconClicked(icon.index)">
              <img :src="icon.url" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

import fireIcon from "@/assets/images/fire.png";
import MarkerBlue from "@/assets/images/marker-icon-blue.png";
import MarkerPink from "@/assets/images/marker-icon-pink.png";
import MarkerRed from "@/assets/images/marker-icon-red.png";
import MarkerYellow from "@/assets/images/marker-icon-yellow.png";
import EnviromentIcon from "@/assets/images/environment.png";
import GasLeakIcon from "@/assets/images/gas-leak.png";

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
      index: 0,
      url: mission3map,
      bounds: [
        [0, 0],
        [750, 1000],
      ],
      minZoom: -2,
      crs: CRS.Simple,
      icons: [],
      iconImages: [
        MarkerBlue,
        MarkerYellow,
        MarkerPink,
        MarkerRed,
        fireIcon,
        EnviromentIcon,
        GasLeakIcon,
      ],
    };
  },
  mounted() {
    this.$refs.map.mapObject.setView([380, 500], 0.25);
  },
  methods: {
    createIcon(e) {
      const iconConfig = {
        ...e.latlng,
        index: this.index,
        url: this.iconImages[0],
        points: 5,
      };
      this.index++;
      this.icons.push(iconConfig);
    },
    iconClicked(foundIconIndex) {
      const foundIcon = this.icons[foundIconIndex];
      const currentIcon = this.iconImages.find(
        (image) => image === foundIcon.url
      );
      const currentIconIndex = this.iconImages.findIndex(
        (image) => image === currentIcon
      );

      const nextIconIndex =
        this.iconImages.length - 1 <= currentIconIndex
          ? 0
          : currentIconIndex + 1;

      const newIcon = {
        ...foundIcon,
        url: this.iconImages[nextIconIndex],
      };

      const newIcons = cloneDeep(this.icons);
      newIcons[foundIconIndex] = newIcon;
      this.icons = newIcons;
    },
    pointsClick(foundIconIndex, plus) {
      const foundIcon = this.icons[foundIconIndex];
      const newPoints = plus ? foundIcon.points + 1 : foundIcon.points - 1;
      const newIcon = {
        ...foundIcon,
        points: newPoints,
      };

      const newIcons = cloneDeep(this.icons);
      newIcons[foundIconIndex] = newIcon;
      this.icons = newIcons;
    },
    undoClick() {
      if (this.icons.length) {
        this.icons.pop();
        this.index--;
      }
    },
  },
  watch: {
    icons() {
      this.$emit("newIcons", this.icons);
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
  cursor: pointer;
}

td img {
  max-width: 60px;
}

td span {
  padding: 3px 5px;
  background: rgba(128, 128, 128, 0.377);
  border-radius: 5px;
  cursor: pointer;
}
</style>
