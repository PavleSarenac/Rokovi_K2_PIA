import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { Proizvod } from 'src/app/models/proizvod';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {
  user: Korisnik = new Korisnik()
  allProducts: Proizvod[] = []
  error: string = ""

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!)
    this.restService.getAllProducts().subscribe(
      (products: Proizvod[]) => {
        this.allProducts = products.sort((product1, product2) => product1.kategorija.localeCompare(product2.kategorija))
      }
    )
  }

  order() {
    this.error = ""
    let orderedProducts: Proizvod[] = []
    this.allProducts.forEach(
      (product) => {
        if (product.isChecked) orderedProducts.push(product)
      }
    )
    if (orderedProducts.length == 0) {
      this.error = "Morate dodati barem jedan proizvod!"
      return
    }
    localStorage.setItem("orderedProducts", JSON.stringify(orderedProducts))
    this.router.navigate(["narudzbina"])
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }

}
