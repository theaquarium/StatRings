import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { me as companion } from 'companion';
import { initializeSettings, getSettings, changeValue, setUnitPrefs, loadUnitPrefs } from './settingsManager';

initializeSettings();

// Settings have been changed
settingsStorage.addEventListener('change', (evt) => {
  // if it was reset
  if (evt.key === null) {
    // settingsStorage.setItem("wasReset", "false");
    initializeSettings();
    sendSettings({
      type: 'prefsRequest',
    });
  }
  
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