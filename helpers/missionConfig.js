import blueIcon from "@/assets/mapicons/blue-icon.png";
import redIcon from "@/assets/mapicons/red-icon.png";
import yellowIcon from "@/assets/mapicons/yellow-icon.png";
import blocked from "@/assets/mapicons/blocked.png";
import fire from "@/assets/mapicons/fire.png";
import opening from "@/assets/mapicons/opening.png";
import stuck from "@/assets/mapicons/stuck.png";
import reroute from "@/assets/mapicons/reroute.png";

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
};

export const getIconByKey = (icon) => {
  return mapFromAssets[icon];
};
