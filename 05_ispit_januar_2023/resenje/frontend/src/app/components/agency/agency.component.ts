import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from 'src/app/models/agency';
import { Offer } from 'src/app/models/offer';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  loggedInAgency = new Agency()
  newOffer = new Offer()
  newOfferErrors: string[] = []

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.loggedInAgency = JSON.parse(localStorage.getItem("loggedInUser")!)
  }

  addNewOffer() {
    this.newOfferErrors = []
    if (this.newOffer.tip == "")
      this.newOfferErrors.push("Nije popunjeno polje tip...")
    if (this.newOffer.lokacija_od == "" && this.newOffer.tip != "hotel")
      this.newOfferErrors.push("Nije popunjeno polje lokacija_od...")
    if (this.newOffer.lokacija_do == "")
      this.newOfferErrors.push("Nije popunjeno polje lokacija_do...")
    if (this.newOffer.period == "")
      this.newOfferErrors.push("Nije popunjeno polje period...")
    if (this.newOffer.cena <= 0)
      this.newOfferErrors.push("Cena mora biti pozitivan broj...")
    if (this.newOffer.broj_mesta <= 0)
      this.newOfferErrors.push("Broj mesta mora biti pozitivan broj...")
    if (this.newOfferErrors.length > 0) return
    this.loggedInAgency.usluge.push(this.newOffer)
    localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInAgency))
    this.restService.addNewOffer(this.newOffer, this.loggedInAgency.korisnickoIme).subscribe(
      () => {
        this.newOffer = new Offer()
      }
    )
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
