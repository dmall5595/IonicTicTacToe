import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';


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
    console.log('ionViewDidLoad ChoosePlayerPage');
  }

  chooseMode(isOnePlayer) {
    this.navCtrl.push(HomePage, {isOnePlayer: isOnePlayer})
  }

}
