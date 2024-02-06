import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { Traveler } from 'src/app/models/traveler';
import { Trip } from 'src/app/models/trip';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  offer: Offer = new Offer()
  traveler: Traveler = new Traveler()
  numberOfCotravelers: number = 0
  price: number = 0
  error: string = ""

  constructor(private restService: RestService, private router: Router) { }

  ngOnInit(): void {
    this.offer = JSON.parse(localStorage.getItem("offer")!)
    this.traveler = JSON.parse(localStorage.getItem("loggedInUser")!)
  }

  buy() {
    this.error = ""
    this.price = (this.numberOfCotravelers + 1) * this.offer.cena
    if (this.numberOfCotravelers > 2) this.price = 0.8 * this.price
    if (this.offer.broj_mesta < this.numberOfCotravelers + 1) {
      this.error = "Agencija nema dovoljno raspolozivih mesta!"
      return
    }
    if (this.price > this.traveler.novac) {
      this.error = "Nemate dovoljno novca na racunu!"
      return
    }
    let trip = new Trip()
    trip.idusluge = this.offer.idponude
    trip.lokacija_od = this.offer.lokacija_od
    trip.lokacija_do = this.offer.lokacija_do
    trip.brojsaputnika = this.numberOfCotravelers
    this.traveler.lista.push(trip)
    this.traveler.novac -= this.price
    localStorage.setItem("loggedInUser", JSON.stringify(this.traveler))
    this.restService.addNewTrip(this.traveler.korisnickoIme, trip, this.price).subscribe(
      () => {
        localStorage.removeItem("offer")
        this.router.navigate(["traveler"])
      }
    )
  }
}
