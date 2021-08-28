import clock from 'clock';
import { setupRings } from './rings';
import { setupCards } from './cards';
import { setupAffirmations } from './affirmations';
import { mainFaceUpdater, clockUpdater } from './faceUpdater';
import { initializeSettings } from './settings';
import { initializeHr } from './hr';
import { initializeAod } from './aod';

initializeSettings(() => {
  clockUpdater(new Date());
  setupRings();
  setupCards();
  // setupAffirmations();
  mainFaceUpdater();
  initializeHr();
});

// Set update intervals
const faceDataUpdateInterval = 5;
const heartRateFrequency = 1;
clock.granularity = 'minutes';

setupRings();
setupCards();
// setupAffirmations();
initializeHr();

setInterval(mainFaceUpdater, faceDataUpdateInterval * 1000);
mainFaceUpdater();

// Update clock
clock.ontick = (evt) => {
  clockUpdater(evt.date);
};