import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuoteDetailPage } from "../quote-detail/quote-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  pushNewPage() {
    console.log("todo: push");
    this.navCtrl.push(QuoteDetailPage);
  }

}
