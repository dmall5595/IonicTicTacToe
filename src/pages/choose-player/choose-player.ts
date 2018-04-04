import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GamePage } from '../game/game';


/**
 * Generated class for the ChoosePlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
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
