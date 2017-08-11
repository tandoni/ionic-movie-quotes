import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { MovieQuote } from "../../models/movie-quotes";
import { Subscription } from "rxjs/Subscription";

/**
 * Generated class for the QuoteDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quote-detail',
  templateUrl: 'quote-detail.html',
})
export class QuoteDetailPage implements OnInit, OnDestroy {

  movieQuoteStream: FirebaseObjectObservable<MovieQuote>;
  movieQuote: MovieQuote;
  private movieQuoteSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: AngularFireDatabase, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    const quoteKey = this.navParams.get('key');
    this.movieQuoteStream = this.db.object(`/quotes/${quoteKey}`);
    this.movieQuoteSubscription = this.movieQuoteStream.subscribe( (quote) => { 
      this.movieQuote = quote;
     });
  }

  ngOnDestroy() {
    this.movieQuoteSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuoteDetailPage');
  }

  editQuote() {
    const prompt = this.alertCtrl.create({
      title: 'Edit Quote',
      inputs: [
        {
          name: 'quote',
          placeholder: 'Quote that you like :D',
          value: this.movieQuote.quote,
        },
        {
          name: 'movie',
          placeholder: 'From movie',
          value: this.movieQuote.movie,
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
          text: 'Edit Quote',
          handler: (data: MovieQuote) => {
            if (data.quote && data.movie) {
              this.movieQuoteStream.set(data);
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

}
