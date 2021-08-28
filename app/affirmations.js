import document from 'document';
import { getSettings } from './settings';
import { affirmationQuotes } from './affirmationQuotes';

const updateInterval = 7200; // In seconds, 2 hours

const affirmationElement = document.getElementById('Affirmation');
let lastUpdate = -1;
let name = '';
let affIndex = -1;
let showAffirmations = true;

export function setupAffirmations() {
  const settings = getSettings();
  
  showAffirmations = settings.showAffirmations;
  
  if (!showAffirmations) {
    affirmationElement.text = '';
  }
  
  name = settings.name;
}

export function updateAffirmations() {
  if (!showAffirmations) {
    affirmationElement.text = '';
    return;
  }
  
  const now = Date.now();
  if (now - lastUpdate > updateInterval * 60) {
    let newIndex = affIndex;
    while (newIndex === affIndex) {
      newIndex = Math.floor(Math.random() * affirmationQuotes.length);
    }
    affIndex = newIndex;
    lastUpdate = now;
  }
  
  const affirmation = affirmationQuotes[affIndex];
  if (name && name !== null && name !== '') {
    affirmationElement.text = affirmation.named.replace('{name}', name);
  } else {
    affirmationElement.text = affirmation.nameless;
  }
}