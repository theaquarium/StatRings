import * as messaging from 'messaging';
import { writeSettings } from './saveSettings';
import defaultSettings from '../common/defaultSettings';
import { preferences, units } from "user-settings";

let settings = JSON.parse(JSON.stringify(defaultSettings));

// default change callback
let changeCallback = () => {};

export function getSettings() {
  return settings;
};

export function setSettings(newSettings) {
  settings = newSettings;
  changeCallback();
}

export function initializeSettings(changeCb) {
  changeCallback = changeCb;
  messaging.peerSocket.addEventListener("open", (evt) => {
    console.log("Watch: Peersocket open");
  });
  messaging.peerSocket.addEventListener("message", (evt) => {
    // send prefs if asked
    if (evt.data.type === 'prefsRequest') {
      console.log('request received')
      // If we have a MessageSocket, send the data to the device
      if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send({
          type: 'unitPrefs',
          // this is redundant just for future safety
          time: preferences.clockDisplay === '24h' ? '24h' : '12h',
          distance: units.distance === 'us' ? 'us' : 'metric'
        });
      }
      return;
    }
    
    console.log('new settings received ' + evt.data.use24h);
    
    settings = evt.data;
    writeSettings();
    changeCallback();
  });
};