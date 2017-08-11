import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { MovieQuote } from "../../models/movie-quotes";
import { QuoteDetailPage } from "../quote-detail/quote-detail";

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  movieQuotesStream: FirebaseListObservable<MovieQuote[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.movieQuotesStream = this.db.list('quotes');
  }

  addQuote() {
    const prompt = this.alertCtrl.create({
      title: 'Add Quote',
      inputs: [
        {
          name: 'quote',
          placeholder: 'Quote that you like :D'
        },
        {
          name: 'movie',
          placeholder: 'From movie'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add Quote',
          handler: (data: MovieQuote) => {
            if (data.quote && data.movie) {
              this.movieQuotesStream.push(data);
            } else {
              console.log('Not a valid MovieQuote');
              return false;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  delete(keyToDelete: string) {
    this.movieQuotesStream.remove(keyToDelete);
  }

  pushToDetail(quote: MovieQuote) {
    this.navCtrl.push(QuoteDetailPage, { key: quote.$key });
  }

}
