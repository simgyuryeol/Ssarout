import { App } from './App';
import './style.css';

function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
}

const appContainer = document.querySelector('#app');
const app = new App(appContainer);
