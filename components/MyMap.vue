<template>
  <Card class="filler">
    <div class="points-header">
      <div class="points-number">POINTS: {{ points }}</div>
      <OpenModal />
    </div>

    <div class="map-container">
      <l-map
        ref="map"
        :min-zoom="minZoom"
        :crs="crs"
        :options="mapOptions"
        style="height: 500px; width: 100%;"
      >
        <LImageOverlay :url="url" :bounds="bounds" />
        <l-marker
          v-for="icon in icons"
          :key="icon.name"
          :lat-lng="icon"
          @click="iconClicked(icon)"
        >
          <!-- disabled is actually reversed. I was lazy and didn't change it -->
          <l-icon
            v-if="icon.icon"
            :icon-size="icon.iconSize"
            :class-name="!icon.disabled ? 'myicon turn-green' : 'myicon'"
            :icon-url="getIconByKeyMethod(icon.icon)"
          />
        </l-marker>
      </l-map>
    </div>

    <div class="extra-points">
      <div class="extra-points-title">Extra Points</div>
      <div class="row extra-points-table">
        <div
          v-for="point in mission.extraPoints"
          :key="point.index + 'check'"
          class="extra-points-check waves-effect waves-dark"
          :class="{ enabled: point.enabled }"
          @click="extraPointsClicked(point)"
        >
          <div class="extra-points-check-title ">
            <div>{{ point.name }}</div>
            <div class="extra-points-check-title-badge">
              +{{ point.points }}
            </div>
          </div>
        </div>
      </div>
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

import OpenModal from "@/components/OpenModal.vue";

import { getIconByKey, getMapByKey } from "@/helpers/missionConfig";
import { cloneDeep } from "lodash";
import { Icon } from "leaflet";

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
    OpenModal,
  },
  data() {
    return {
      bounds: [
        [0, 0],
        [750, 1000],
      ],
      minZoom: -1.25,
      crs: CRS.Simple,
      mapOptions: {
        scrollWheelZoom: false,
        doubleClickZoom: false,
        zoomDelta: 0.5,
        zoomSnap: 0,
      },
      icons: [],
      extraPoints: 0,
    };
  },
  mounted() {
    this.$refs.map.mapObject.setView([380, 500], -0.25);
    this.icons = this.mission.mapEvents || [];
  },
  methods: {
    iconClicked(icon) {
      const foundIconIndex = icon.index;
      const newIcon = {
        ...icon,
        disabled: !icon.disabled,
      };
      let newIcons = cloneDeep(this.icons);
      newIcons[foundIconIndex] = newIcon;
      this.icons = newIcons;
    },
    getIconByKeyMethod(icon) {
      return getIconByKey(icon);
    },
    extraPointsClicked(extraPoint) {
      this.extraPoints = this.extraPoints + extraPoint.points;
      M.toast({
        html: `Added ${extraPoint.points} points`,
        displayLength: 1050,
        class: "green darken-1",
      });
    },
  },
  computed: {
    points() {
      let points = 0;
      this.icons.forEach((icon) => {
        if (!icon.disabled) {
          points = icon.points + points;
        }
      });
      points = points + this.extraPoints;
      return `${points}/100`;
    },
    url() {
      const mapIndex = this.mission.selectedMap.index;
      return getMapByKey(mapIndex) || this.mission.selectedMap.map;
    },
  },
  watch: {
    points() {
      this.$fireDb.ref().update({
        points: this.points,
      });
    },
  },
};
</script>

<style lang="scss">
.points {
  &-number {
    font-size: 38px;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: 22px;
    font-weight: 500;
    min-width: 35%;
    margin-right: 20px;
  }

  &-header {
    display: flex;
    justify-content: space-between;
  }
}

.map-container {
  position: relative;
}

.filler {
  padding-bottom: 30px;
}

.myicon {
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.15));
}

.extra-points {
  margin-top: 15px;
  margin-left: 15px;

  &-table {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  &-title {
    font-size: 30px !important;
    font-weight: 500;
    margin-bottom: 15px;
  }

  &-check {
    margin-right: 10px;
    margin-left: 10px;
    min-width: 175px;
    border: 3px solid black;
    border-radius: 15px;
    padding: 10px 25px;
    margin-bottom: 10px;
    transition: 300ms all;
    cursor: pointer;
    &:hover {
      background: rgba(50, 170, 34, 0.116);
      transform: scale(0.99);
    }
  }

  &-check-title {
    font-size: 24px !important;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-badge {
      padding: 1px 40px;
      background: rgb(50, 170, 34);
      color: white;
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.turn-green {
  border-radius: 100%;
  padding: 3px;
  border: 3px solid rgb(36, 165, 53);
  background: rgb(179, 219, 179);
  filter: drop-shadow(0px 0px 5px rgba(21, 177, 81, 0.25));
}
</style>
