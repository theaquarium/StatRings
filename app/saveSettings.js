import * as fs from 'fs';
import { getSettings, setSettings } from './settings';

const settingsFilename = 'settings.json';

export function writeSettings() {
   fs.writeFileSync(settingsFilename, getSettings(), 'json');
}

export function readSettings() {
  // only read settings if they exist
  if (fs.existsSync(settingsFilename)) {
    try {
      const json_object  = fs.readFileSync(settingsFilename, 'json');
      setSettings(json_object);
    } catch (e) {
      console.log('error reading settings json, moving on...')
    }
  }
}

