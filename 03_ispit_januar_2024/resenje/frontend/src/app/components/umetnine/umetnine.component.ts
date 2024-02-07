import { Component, OnInit } from '@angular/core';
import { Aukcija } from 'src/app/models/aukcija';
import { Korisnik } from 'src/app/models/korisnik';
import { Umetnina } from 'src/app/models/umetnina';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-umetnine',
  templateUrl: './umetnine.component.html',
  styleUrls: ['./umetnine.component.css']
})
export class UmetnineComponent implements OnInit {
  auction: Aukcija = new Aukcija()
  user: Korisnik = new Korisnik()
  auctionArtworks: Umetnina[] = []

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.auction = JSON.parse(localStorage.getItem("auction")!)
    this.user = JSON.parse(localStorage.getItem("user")!)
    this.restService.getArtworks(this.auction.naziv).subscribe(
      (artworks: Umetnina[]) => {
        this.auctionArtworks = artworks
      }
    )
  }

  bid(artwork: Umetnina) {
    artwork.error = ""

    let currentDateTime = this.restService.getCurrentDateTimeString()
    if (currentDateTime > this.auction.kraj) {
      artwork.error = "Aukcija vise nije otvorena!"
      return
    }

    if (artwork.novaPonuda == null) {
      artwork.error = "Niste uneli novu ponudu!"
      return
    }
    if (artwork.ponuda != null && artwork.novaPonuda <= Number(artwork.ponuda)) {
      artwork.error = "Nova ponuda mora biti veca od trenutne!"
      return
    }

    this.restService.bid(artwork, this.auction.naziv, this.user.korisnicko_ime).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

}
