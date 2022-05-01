import clock from 'clock';
import document from 'document';
import { battery, charger } from 'power';
import * as util from '../common/utils';
import { getSettings } from './settings';
import { updateRings } from './rings';
import { updateCards } from './cards';
import { updateAffirmations } from './affirmations';

// Get UI elements
const clockHours = document.getElementById('Clock-hours');
const clockMinutes = document.getElementById('Clock-minutes');
const ampm = document.getElementById('AMPM-indicator');
const ampmM = document.getElementById('AMPM-indicator-M');
const batteryIcon = document.getElementById('Battery-icon');
const batteryText = document.getElementById('Battery-text');
const dateText = document.getElementById('Date');
const dateMiddleText = document.getElementById('DateMiddle');

// Day and month names
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function clockUpdater(today) {
  const settings = getSettings();
  
  let hours = today.getHours();
  
  if (!settings.use24h && settings.showAmpm) {
    const amPm = hours > 11 ? 'P' : 'A';
    ampm.text = amPm;
    
    ampm.style.display = 'inline';
    ampmM.style.display = 'inline';
  } else {
    ampm.style.display = 'none';
    ampmM.style.display = 'none';
  }
  
  if (settings.use24h) {
    // 24h format
    hours = util.zeroPad(hours);
  } else {
    // 12h format
    hours = util.zeroPad(hours % 12 || 12);
  }
  hours = util.monoDigits(hours);
  clockHours.text = hours;

  const mins = util.monoDigits(util.zeroPad(today.getMinutes()));
  clockMinutes.text = mins;
  
  let dateString = "";
  if (settings.showDate) {
    if (settings.showWeekday) {
      dateString = `${dayNames[today.getDay()]}, ${monthNames[today.getMonth()]} ${today.getDate()}`;
    } else {
      dateString = `${monthNames[today.getMonth()]} ${today.getDate()}`;
    }
  }
  
  dateText.text = dateString;
  dateMiddleText.text = dateString;
}

export function mainFaceUpdater() {
  const settings = getSettings();
  
  if (settings.showBattery) {
    // Update battery info
    if (charger.connected) {
      batteryText.style.fill = 'fb-slate';
      batteryIcon.style.fill = 'fb-slate';
      batteryIcon.href = 'icons/battery-charging.png';
    } else if (battery.chargeLevel < 20) {
      batteryText.style.fill = 'fb-red';
      batteryIcon.style.fill = 'fb-red';
      batteryIcon.href = 'icons/battery-dead.png';
    } else if (battery.chargeLevel < 40) {
      batteryText.style.fill = 'fb-peach';
      batteryIcon.style.fill = 'fb-peach';
      batteryIcon.href = 'icons/battery-half.png';
    } else {
      batteryText.style.fill = 'fb-mint';
      batteryIcon.style.fill = 'fb-mint';
      batteryIcon.href = 'icons/battery-full.png';
    }

    batteryText.text = `${battery.chargeLevel}%`;
    
    dateText.style.display = 'inline';
    dateMiddleText.style.display = 'none';
  } else {
    batteryText.text = '';
    batteryIcon.href = '';
    
    dateText.style.display = 'none';
    dateMiddleText.style.display = 'inline';
  }
  
  updateRings();
  updateCards();
  // updateAffirmations();
};
