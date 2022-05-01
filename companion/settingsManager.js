import { settingsStorage } from "settings";
import defaultSettings from '../common/defaultSettings';

// Actual settings storage
let settings = defaultSettings;

// Unit preferences - start with defaults
let unitPrefs = {
  use24h: settings.use24h,
  useMetricDistance: settings.useMetricDistance,
}

const settingsTypes = {
  use24h: "bool",
  showAmpm: "bool",
  showDate: "bool",
  showWeekday: "bool",
  showBattery: "bool",
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
  // copy
  settings = JSON.parse(JSON.stringify(defaultSettings));
  
  Object.keys(settings).forEach((key) => {
    // Put already stored values into the companion's settings cache
    const readVal = settingsStorage.getItem(key);
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

export function setUnitPrefs(prefs) {
  unitPrefs = prefs;
}
  
export function loadUnitPrefs() {
  // only use prefs if the user hasn't explicitly set them
  if (settingsStorage.getItem('timeSet') !== "true") {
    const value = unitPrefs.use24h ? 'true' : 'false';
    settingsStorage.setItem('use24h', value);
    changeValue('use24h', value);
  }
  if (settingsStorage.getItem('distanceSet') !== "true") {
    const value = unitPrefs.useMetricDistance ? 'true' : 'false';
    settingsStorage.setItem('useMetricDistance', value);
    changeValue('useMetricDistance', value);
  }
}
