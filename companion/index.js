import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { me as companion } from 'companion';
import { initializeSettings, getSettings, changeValue, setUnitPrefs, loadUnitPrefs } from './settingsManager';

initializeSettings();

// Settings have been changed
settingsStorage.addEventListener('change', (evt) => {
  console.log('settings change', evt.key, evt.newValue)
  // if it was reset
  if (evt.key === null) {
    console.log('so we are doing things')
    // settingsStorage.setItem("wasReset", "false");
    console.log('and initializing')
    initializeSettings();
    console.log('and sending a request')
    sendSettings({
      type: 'prefsRequest',
    });
  }
  
  console.log('sending new settings', evt.key, evt.newValue)
  sendSettings(changeValue(evt.key, evt.newValue));
});

messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Companion: Peersocket open");
  sendSettings(getSettings());
  sendSettings({
    type: 'prefsRequest',
  });
});

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data.type === 'unitPrefs') {
    console.log('received prefs', evt.data.time)
    setUnitPrefs({
      use24h: evt.data.time === '24h',
      useMetricDistance: evt.data.distance === 'metric',
    });
    loadUnitPrefs();
    sendSettings(getSettings());
  }
});

function sendSettings(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log('No peerSocket connection');
  }
}