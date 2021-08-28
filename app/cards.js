import document from 'document';
import { statColors, iconPaths } from '../common/consts';
import { getSettings } from './settings';
import { getStatValue } from './utils';

const cards = [];

class Card {
  constructor(id, stat, showCard) {
    this.id = id;
    this.stat = stat;
    
    this.color = statColors[this.stat];
    this.showCard = showCard;
    
    this.card = document.getElementById(`Stat-${id}`);
    this.text = document.getElementById(`Stat-${id}-text`);
    this.icon = document.getElementById(`Stat-${id}-icon`);
  }
  
  initialize() {
    this.icon.href = iconPaths[this.stat];
    this.icon.style.fill = this.color;
    
    this.text.text = '0';
    
    this.card.style.display = this.showCard ? 'inline' : 'none';
  }
  
  setValue(val) {
    this.text.text = val;
  }
  
  hide() {
    this.card.style.display = "none";
    this.text.style.display = "none";
    this.icon.style.display = "none";
  }
  
  show() {
    this.card.style.display = this.showCard ? 'inline' : 'none';
    this.text.style.display = "inline";
    this.icon.style.display = "inline";
  }
  
  update() {
    const settings = getSettings();
    
    let val = getStatValue(this.stat);
    if (this.stat === 'distance') {
      if (!settings.useMetricDistance) {
        val = val * 0.6213712;
      }
      val = Number(val / 1000).toFixed(2).toLocaleString(); 
    } else if (this.stat === 'calories') {
      if (settings.useMetricEnergy) {
        val = val * 4.184;
      }
      if (val > 99999) {
        val = Number(val / 1000).toFixed(1).toLocaleString() + 'k';
      } else {
        val = val.toFixed(0).toLocaleString();
      }
    } else if (this.stat === 'steps' || this.stat === 'calories') {
      if (val > 99999) {
        val = Number(val / 1000).toFixed(1).toLocaleString() + 'k';
      } else {
        val = val.toFixed(0).toLocaleString();
      }
    }
    this.setValue(val);
  }
}

export function setupCards() {
  const settings = getSettings();
  
  const card0 = new Card(0, settings.card0Stat, settings.showStatsCardBg);
  card0.initialize();
  card0.update();
  cards.push(card0);
  
  const card1 = new Card(1, settings.card1Stat, settings.showStatsCardBg);
  card1.initialize();
  card1.update();
  cards.push(card1);
  
  const card2 = new Card(2, settings.card2Stat, settings.showStatsCardBg);
  card2.initialize();
  card2.update();
  cards.push(card2);
}

export function updateCards() {
  cards.forEach((card) => {
    card.update();
  });
}