import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { Narudzbina } from 'src/app/models/narudzbina';
import { PoruceniProizvod } from 'src/app/models/poruceni-proizvod';
import { Proizvod } from 'src/app/models/proizvod';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-narudzbina',
  templateUrl: './narudzbina.component.html',
  styleUrls: ['./narudzbina.component.css']
})
export class NarudzbinaComponent implements OnInit {
  orderedProducts: Proizvod[] = []
  error: string = ""
  user: Korisnik = new Korisnik()
  billMessage: string = ""

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.orderedProducts = JSON.parse(localStorage.getItem("orderedProducts")!)
    this.user = JSON.parse(localStorage.getItem("user")!)
  }

  confirmOrder() {
    let products: PoruceniProizvod[] = []
    let bill: number = 0
    this.orderedProducts.forEach(
      (product) => {
        if (product.numberOfKilograms == null) {
          this.error = "Niste uneli sve podatke!"
          return
        }
        let newOrderedProduct = new PoruceniProizvod()
        newOrderedProduct.naziv = product.naziv
        newOrderedProduct.kolicina = product.numberOfKilograms
        bill += Number(product.numberOfKilograms) * Number(product.cena)
        products.push(newOrderedProduct)
      }
    )
    let order = new Narudzbina()
    order.kupac = this.user.kor_ime
    order.proizvodi = products
    order.racun = bill
    this.restService.order(order).subscribe(
      () => {
        this.billMessage = `Vas racun je ${bill} RSD.`
      }
    )
  }
}
