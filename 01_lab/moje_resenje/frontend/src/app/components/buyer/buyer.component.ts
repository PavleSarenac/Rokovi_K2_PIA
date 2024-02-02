import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Response } from 'src/app/models/response';
import { User } from 'src/app/models/user';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  allSellingProducts: Product[] = []
  loggedInUser: User = new User()
  newProduct: Product = new Product()

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.restService.getAllSellingProducts().subscribe(
      (allSellingProducts: Product[]) => {
        allSellingProducts.forEach(
          (product: Product) => {
            this.restService.getUserByUsername(product.kreator).subscribe(
              (creator: User) => {
                product.imeKreatora = creator.ime
                product.prezimeKreatora = creator.prezime
              }
            )
          }
        )
        this.allSellingProducts = allSellingProducts
      }
    )
    this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!)
  }

  likeProduct(product: Product) {
    this.restService.likeProduct(product).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  addNewProduct() {
    this.newProduct.kreator = this.loggedInUser.kor_ime
    this.restService.addNewProduct(this.newProduct).subscribe()
  }

  logout() {
    localStorage.removeItem("loggedInUser")
    this.router.navigate([""])
  }
}
