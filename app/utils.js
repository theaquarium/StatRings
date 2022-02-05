import { me as appbit } from "appbit";
import { today, goals } from "user-activity";

export function getStatValue(stat) {
  if (!appbit.permissions.granted("access_activity")) {
     console.log("Activity permission blocked");
     return 0;
  }
  switch (stat) {
    case "steps":
      return today.adjusted.steps ?? 0;
      break;
    case "distance":
      return today.adjusted.distance ?? 0;
      break;
    case "calories":
      return today.adjusted.calories ?? 0;
      break;
    case "floors":
    case "elevationGain":
      return today.adjusted.elevationGain ?? 0;
      break;
    case "azm":
    case "activeZoneMinutes":
      return today.adjusted.activeZoneMinutes?.total ?? 0;
      break;
    default:
      return 0;
      break;
  }
}

export function getGoalValue(stat) {
  if (!appbit.permissions.granted("access_activity")) {
     console.log("Activity permission blocked");
     // the goal value returns one so it doesn't divide by 0
     return 1;
  }
  switch (stat) {
    case "steps":
      return goals.steps ?? 1;
      break;
    case "distance":
      return goals.distance ?? 1;
      break;
    case "calories":
      return goals.calories ?? 1;
      break;
    case "floors":
    case "elevationGain":
      return goals.elevationGain ?? 1;
      break;
    case "azm":
    case "activeZoneMinutes":
      return goals.activeZoneMinutes?.total ?? 1;
      break;
    default:
      return 1;
      break;
  }
}