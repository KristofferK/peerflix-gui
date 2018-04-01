import * as child from 'child_process';

export class PeerflixManager {
  private player: string = "vlc";
  private link: string = "";

  setPlayer(player: string) {
    this.player = player;
  }

  setLink(link: string) {
    this.link = link;
  }

  run() {
    child.exec(`start cmd.exe /K peerflix ${this.link} --${this.player}`);
  }
}