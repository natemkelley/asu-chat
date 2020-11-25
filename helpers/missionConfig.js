//Regular Icons
import blueIcon from "@/assets/mapicons/blue-icon.png";
import redIcon from "@/assets/mapicons/red-icon.png";
import yellowIcon from "@/assets/mapicons/yellow-icon.png";
import blocked from "@/assets/mapicons/blocked.png";
import fire from "@/assets/mapicons/fire.png";
import opening from "@/assets/mapicons/opening.png";
import stuck from "@/assets/mapicons/stuck.png";
import reroute from "@/assets/mapicons/reroute.png";

//Disabled Icon
import blueIconDisabled from "@/assets/mapicons/blue-icon-disabled.png";
import redIconDisabled from "@/assets/mapicons/red-icon-disabled.png";
import yellowIconDisabled from "@/assets/mapicons/yellow-icon-disabled.png";
import blockedDisabled from "@/assets/mapicons/blocked-disabled.png";
import fireDisabled from "@/assets/mapicons/fire-disabled.png";
import openingDisabled from "@/assets/mapicons/opening-disabled.png";
import stuckDisabled from "@/assets/mapicons/stuck-disabled.png";
import rerouteDisabled from "@/assets/mapicons/reroute-disabled.png";

//missions
import mission1map from "@/assets/images/mission1map.png";
import mission2map from "@/assets/images/mission2map.png";
import mission3map from "@/assets/images/mission3map.png";
import trainingmap from "@/assets/images/trainingmap.png";

export const missionConfig = [
  {
    missionName: "Training",
  },
  {
    missionName: "Mission 1",
  },
  {
    missionName: "Mission 2",
  },
  {
    missionName: "Mission 3",
  },
];

export const mapIcons = [
  "blueIcon",
  "redIcon",
  "yellowIcon",
  "blocked",
  "fire",
  "opening",
  "stuck",
  "reroute",
];

export const mapFromAssets = {
  blueIcon,
  redIcon,
  yellowIcon,
  blocked,
  fire,
  opening,
  stuck,
  reroute,
  blueIconDisabled,
  redIconDisabled,
  yellowIconDisabled,
  blockedDisabled,
  fireDisabled,
  openingDisabled,
  stuckDisabled,
  rerouteDisabled,
};

export const getIconByKey = (icon) => {
  return mapFromAssets[icon];
};

export const getMapByKey = (mapIndex) => {
  const maps = [mission1map, mission2map, mission3map, trainingmap];
  return maps[mapIndex - 1];
};
