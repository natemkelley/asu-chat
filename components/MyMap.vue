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
          <l-icon
            v-if="icon.icon"
            :icon-size="icon.iconSize"
            :class-name="icon.disabled ? 'myicon icon-disabled' : 'myicon'"
            :icon-url="getIconByKeyMethod(icon.icon)"
          />
        </l-marker>
      </l-map>
    </div>

    <div class="extra-points">
      <div class="extra-points-title">Extra Points</div>
      <div class="row extra-points-table">
        <div
          v-for="point in extraPoints"
          :key="point.index + 'check'"
          class="extra-points-check"
          :class="{ enabled: point.enabled }"
        >
          <label>
            <input
              type="checkbox"
              class="filled-in"
              @click="extraPointsClicked(point)"
            />
            <span class="extra-points-check-title"
              >{{ point.name }} ({{ point.points }})</span
            >
          </label>
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

import { getIconByKey } from "@/helpers/missionConfig";
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
      extraPoints: [],
    };
  },
  mounted() {
    this.$refs.map.mapObject.setView([380, 500], -0.25);
    this.icons = this.mission.mapEvents || [];
    this.extraPoints = this.mission.extraPoints || [];
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
      const indexFound = this.extraPoints.findIndex(
        (point) => point.index === extraPoint.index
      );
      const newExtraPoint = {
        ...extraPoint,
        enabled: !Boolean(extraPoint.enabled),
      };

      const newExtraPoints = cloneDeep(this.extraPoints);
      newExtraPoints[indexFound] = newExtraPoint;

      this.extraPoints = newExtraPoints;
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
      this.extraPoints.forEach((extraPoint) => {
        if (extraPoint.enabled) {
          points = extraPoint.points + points;
        }
      });
      return `${points}/100`;
    },
    url() {
      return this.mission.selectedMap.map;
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

#map {
  height: 580px;
}

.filler {
  padding-bottom: 30px;
}

.myicon {
  filter: drop-shadow(0px 0px 2.5px rgba(0, 0, 0, 0.12));

  &.icon-disabled {
    filter: grayscale(0.95) !important;
  }
}

.extra-points {
  margin-top: 15px;
  margin-left: 15px;

  &-table {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .enabled {
      background: rgba(81, 196, 66, 0.349);
    }
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
  }

  &-check-title {
    font-size: 24px !important;
    color: black;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}

[type="checkbox"].filled-in:checked + span:not(.lever):after {
  top: 0;
  border: 2px solid rgb(37, 148, 51);
  background-color: rgb(38, 166, 55);
  z-index: 0;
}
</style>
