export = 0;

import { PeerflixManager } from './peerflix-manager';

const peerflix = new PeerflixManager();

const runElem = <HTMLButtonElement>document.querySelector("#run-peerflix");
runElem.addEventListener('click', (e: MouseEvent) => {
  const form = new FormData(document.querySelector('form'))
  peerflix.setLink(form.get('magnet-link').toString());
  peerflix.setPlayer(form.get('player').toString());
  peerflix.run();
})