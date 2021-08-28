import * as messaging from "messaging";

let settings = {
  use24h: false,
  showAmpm: false,
  showWeekday: true,
  showAffirmations: true,
  useMetricDistance: false,
  useMetricEnergy: false,
  name: null,
  showHr: true,
  showStatsCardBg: true,
  card0Stat: "steps",
  card1Stat: "distance",
  card2Stat: "calories",
  ring0Stat: "steps",
  ring1Stat: "distance",
  ring2Stat: "calories",
};

export function getSettings() {
  return settings;
};

export function initializeSettings(changeCb) {
  messaging.peerSocket.addEventListener("open", (evt) => {
    console.log("Watch: Peersocket open");
  });
  messaging.peerSocket.addEventListener("message", (evt) => {
    settings = evt.data;
    changeCb();
  });
};