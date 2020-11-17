<template>
  <div class="map-container">
    <div v-show="!selectedMap" class="row choose-map">
      <div class="input-field col s5">
        <select v-model="selectedMap">
          <option v-for="map in maps" :key="map.index + 'maps'" :value="map">{{
            map.name
          }}</option>
        </select>
        <label>Choose your map</label>
      </div>
    </div>

    <div v-if="url && selectedMap">
      <l-map
        ref="map"
        :min-zoom="minZoom"
        :crs="crs"
        :options="mapOptions"
        style="height: 500px; width: 100%;"
        @click="createIcon"
      >
        <LImageOverlay :url="url" :bounds="bounds" />
        <l-marker
          v-for="icon in icons"
          :key="icon.name"
          :lat-lng="icon"
          @click="iconClicked(icon.index)"
        >
          <l-icon
            v-if="icon.icon"
            :icon-url="getIconByKeyMethod(icon.icon)"
            :icon-size="icon.iconSize"
          />
        </l-marker>
      </l-map>
      <div @click="undoClick" v-if="selectedMap" class="undo">UNDO</div>
    </div>

    <div v-if="selectedMap" class="choose-icon">
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
            <td @click="iconClicked(icon.index)" class="clickable">
              <img :src="getIconByKeyMethod(icon.icon)" />
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
import mission2map from "@/assets/images/mission2map.png";
import mission1map from "@/assets/images/mission1map.png";
import trainingmap from "@/assets/images/trainingmap.png";

import { Icon } from "leaflet";
import { cloneDeep } from "lodash";

import { mapIcons, getIconByKey } from "@/helpers/missionConfig";

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
      selectedMap: null,
      index: 0,
      bounds: [
        [0, 0],
        [750, 1000],
      ],
      minZoom: -1.25,
      crs: CRS.Simple,
      icons: [],
      iconImages: [...mapIcons],
      mapOptions: {
        scrollWheelZoom: false,
        doubleClickZoom: false,
        zoomDelta: 0.5,
        zoomSnap: 0,
      },
    };
  },
  mounted() {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems, {});
  },
  methods: {
    createIcon(e) {
      const iconConfig = {
        ...e.latlng,
        index: this.icons.length,
        icon: this.iconImages[0],
        points: 5,
        iconSize: [32, 32],
        disabled: true,
      };
      this.icons.push(iconConfig);
    },
    iconClicked(foundIconIndex) {
      const foundIcon = this.icons[foundIconIndex];
      const currentIcon = this.iconImages.find(
        (image) => image === foundIcon.icon
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
        icon: this.iconImages[nextIconIndex],
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
      }
    },
    setViewMap() {
      this.$nextTick().then(() => {
        this.$refs.map.mapObject.setView([380, 500], -1.5);
      });
    },
    getIconByKeyMethod(icon) {
      return getIconByKey(icon);
    },
  },
  computed: {
    maps() {
      return [
        {
          index: 4,
          map: trainingmap,
          name: "Training Map",
        },
        {
          index: 3,
          map: mission3map,
          name: "Mission 3 Map",
        },
        {
          index: 2,
          map: mission2map,
          name: "Mission 2 Map",
        },
        {
          index: 1,
          map: mission1map,
          name: "Mission 1 Map",
        },
      ];
    },
    url() {
      return this.selectedMap && this.selectedMap.map;
    },
  },
  watch: {
    icons() {
      this.$emit("newIcons", this.icons);
    },
    selectedMap() {
      this.$emit("selectedMap", this.selectedMap);
    },
    async url() {
      await this.$nextTick();
      if (this.url) {
        this.selectedMap && this.setViewMap();
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

.choose-map {
  margin: 20px;
}

.icon-disabled {
  filter: grayscale(0.8) !important;
}
</style>
