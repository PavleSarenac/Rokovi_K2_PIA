import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { Narudzbina } from 'src/app/models/narudzbina';
import { Proizvod } from 'src/app/models/proizvod';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-prodavac',
  templateUrl: './prodavac.component.html',
  styleUrls: ['./prodavac.component.css']
})
export class ProdavacComponent implements OnInit {
  user: Korisnik = new Korisnik()
  allOrders: Narudzbina[] = []
  allProducts: Proizvod[] = []

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!)
    this.restService.getAllOrders().subscribe(
      (orders: Narudzbina[]) => {
        this.allOrders = orders
      }
    )
    this.restService.getAllProducts().subscribe(
      (products: Proizvod[]) => {
        this.allProducts = products
      }
    )
  }

  updateQuantity() {
    let productsForInsertion: any = []
    this.allProducts.forEach(
      (product) => {
        product.stanje += product.workerAddedKilograms ? product.workerAddedKilograms : 0
        productsForInsertion.push(
          {
            naziv: product.naziv,
            kategorija: product.kategorija,
            cena: product.cena,
            stanje: product.stanje
          }
        )
      }
    )
    this.restService.updateQuantity(productsForInsertion).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
