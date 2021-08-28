import { settingsStorage } from "settings";

// Actual settings storage
const settings = {
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

const settingsTypes = {
  use24h: "bool",
  showAmpm: "bool",
  showWeekday: "bool",
  showAffirmations: "bool",
  useMetricDistance: "bool",
  useMetricEnergy: "bool",
  name: "input",
  showHr: "bool",
  showStatsCardBg: "bool",
  card0Stat: "statselect",
  card1Stat: "statselect",
  card2Stat: "statselect",
  ring0Stat: "statselect",
  ring1Stat: "statselect",
  ring2Stat: "statselect",
};

const statOptions = [
  { name: "None", value: "none" },
  { name: "Steps", value: "steps" },
  { name: "Distance", value: "distance" },
  { name: "Calories", value: "calories" },
  { name: "Floors", value: "floors" },
  { name: "Active Zone Minutes", value: "azm" },
];

export function initializeSettings() {
  Object.keys(settings).forEach((key) => {
    // Put already stored values into the companion's settings cache
    const readVal = settingsStorage.getItem(key);4
    if (readVal !== null) {
      changeValue(key, readVal);
      return;
    }
    
    // Otherwise write default into store
    let storedVal;
    switch (settingsTypes[key]) {
      case "bool": {
        storedVal = settings[key] ? "true" : "false";
        break;
      }
      case "input": {
        storedVal = JSON.stringify({ name: settings[key] });
        break;
      }
      case "statselect": {
        const index = statOptions.findIndex((stat) => stat.value === settings[key]);
        storedVal = JSON.stringify({ values: [statOptions[index]], selected: [index] });
        break;
      }
    }
    
    // Write to storage
    if (storedVal === null) {
      settingsStorage.removeItem(key);
    } else {
      settingsStorage.setItem(key, storedVal);
    }
  });
}

// This edits the companion's settings store, but doesn't publish anything
export function changeValue(key, value) {
  switch (settingsTypes[key]) {
    case "bool": {
      settings[key] = value === "true";
      break;
    }
    case "input": {
      const asObj = JSON.parse(value);
      settings[key] = asObj.name;
      break;
    }
    case "statselect": {
      const asObj = JSON.parse(value);
      settings[key] = asObj.values[0]?.value;
      break;
    }
  }
  return settings;
}
  
export function getSettings() {
  return settings;
}