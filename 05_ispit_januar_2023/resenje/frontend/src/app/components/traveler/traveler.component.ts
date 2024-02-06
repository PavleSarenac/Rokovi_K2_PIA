import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { Traveler } from 'src/app/models/traveler';
import { Trip } from 'src/app/models/trip';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.css']
})
export class TravelerComponent implements OnInit {
  loggedInTraveler = new Traveler()
  newLocation: string = ""
  uniqueLocations: string[] = []
  searchLocationTo: string = ""
  searchOfferTypes: string[] = []
  searchPriceFrom: number = 0
  searchPriceTo: number = -1
  searchError: string = ""
  searchResults: Offer[] = []
  isSearchClicked: boolean = false

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.loggedInTraveler = JSON.parse(localStorage.getItem("loggedInUser")!)
    this.restService.getTripsInfo(this.loggedInTraveler.lista).subscribe(
      (trips: Trip[]) => {
        this.loggedInTraveler.lista = trips
        localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInTraveler))
      }
    )
    this.getUniqueLocations()
  }

  updateLocation() {
    this.loggedInTraveler.lokacijatrenutna = this.newLocation
    localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInTraveler))
    this.restService.updateLocation(this.newLocation, this.loggedInTraveler.korisnickoIme).subscribe()
  }

  getUniqueLocations() {
    this.uniqueLocations = []
    this.loggedInTraveler.lista.forEach(
      (trip: Trip) => {
        if (!this.uniqueLocations.includes(trip.lokacija_od) && trip.lokacija_od != "")
          this.uniqueLocations.push(trip.lokacija_od)
        if (!this.uniqueLocations.includes(trip.lokacija_do))
          this.uniqueLocations.push(trip.lokacija_do)
      }
    )
  }

  search() {
    this.isSearchClicked = true
    this.searchError = ""
    if (this.searchOfferTypes.length == 0) {
      this.searchError = "Morate odabrati bar jedan tip usluge!"
      return
    }
    this.restService.search(this.searchLocationTo, this.searchOfferTypes, this.searchPriceFrom, this.searchPriceTo).subscribe(
      (offers: Offer[]) => {
        this.searchResults = offers
      }
    )
  }

  buyOffer(offer: Offer) {
    localStorage.setItem("offer", JSON.stringify(offer))
    this.router.navigate(["buy"])
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
