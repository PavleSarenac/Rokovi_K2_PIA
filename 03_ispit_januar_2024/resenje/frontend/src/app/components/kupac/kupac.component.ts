import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aukcija } from 'src/app/models/aukcija';
import { Korisnik } from 'src/app/models/korisnik';
import { Umetnina } from 'src/app/models/umetnina';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {
  user: Korisnik = new Korisnik()
  allCurrentAuctions: Aukcija[] = []
  allBoughtArtworks: Umetnina[] = []

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!)
    this.restService.getAllCurrentAuctions().subscribe(
      (auctions: Aukcija[]) => {
        this.allCurrentAuctions = auctions.sort((auction1, auction2) => auction1.kraj.localeCompare(auction2.kraj))
      }
    )
    this.restService.getAllBoughtArtworks(this.user.korisnicko_ime).subscribe(
      (artworks: Umetnina[]) => {
        this.allBoughtArtworks = artworks
      }
    )
  }

  seeArtworks(auction: Aukcija) {
    localStorage.setItem("auction", JSON.stringify(auction))
    this.router.navigate(["umetnine"])
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
