import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import document from 'document';
import { getSettings } from './settings';
import { display } from "display";

const hrText = document.getElementById('Heart-text');
const hrIcon = document.getElementById('Heart-icon');

if (!HeartRateSensor || !appbit.permissions.granted("access_heart_rate") || !BodyPresenceSensor) {
    console.log('Error opening HR sensor, permissions may not be granted.');
}

let useHr = true;
let hrm = new HeartRateSensor({ frequency: 1 });
let body = new BodyPresenceSensor();

hrm.addEventListener('reading', () => {
  hrText.text = hrm.heartRate;
});
body.addEventListener('reading', () => {
  if (!body.present) {
    hrm.stop();
  } else {
    hrm.start();
  }
});
display.addEventListener("change", () => {
  // Automatically stop the sensor when the screen is off to conserve battery
  if (display.on && !display.aodActive && useHr) {
    hrm.start();
    body.start();
  } else {
    hrm.stop();
    body.stop();
  }
});

export function initializeHr() {
  const settings = getSettings();
  
  useHr = settings.showHr;
  if (!settings.showHr) {
    hrText.text = '';
    hrIcon.style.display = 'none';
    hrm.stop();
    body.stop();
  } else {
    hrIcon.style.display = 'inline';
    body.start();
    hrm.start();
  }
}

