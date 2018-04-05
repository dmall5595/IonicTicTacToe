import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GamePage } from '../game/game';

@Component({
  selector: 'page-choose-player',
  templateUrl: 'choose-player.html',
})
export class ChoosePlayerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  chooseMode(isOnePlayer) {
    this.navCtrl.push(GamePage, {isOnePlayer: isOnePlayer})
  }

}
