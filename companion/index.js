import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { me as companion } from 'companion';
import { initializeSettings, getSettings, changeValue } from './settingsManager';

initializeSettings();

// Settings have been changed
settingsStorage.addEventListener('change', (evt) => {
  sendSettings(changeValue(evt.key, evt.newValue));
});

messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Companion: Peersocket open");
  sendSettings(getSettings());
});

function sendSettings(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log('No peerSocket connection');
  }
}