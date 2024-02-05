import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User()
  wishList: Product[] = []
  newProduct: Product = new Product()
  addProductError: string = ""
  allOtherUsers: User[] = []

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("loggedInUser")!)
    this.restService.getWishList(this.user.korisnickoIme).subscribe(
      (wishList: Product[]) => {
        this.wishList = wishList
      }
    )
    this.restService.getAllOtherUsers(this.user.korisnickoIme).subscribe(
      (users: User[]) => {
        this.allOtherUsers = users
      }
    )
  }

  addProduct() {
    this.addProductError = ""
    if (this.newProduct.proizvod == "" || this.newProduct.cena == 0) {
      this.addProductError = "Niste uneli sve podatke!"
      return
    }
    this.restService.addProduct(this.newProduct, this.user.korisnickoIme).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  seeWishList(user: User) {
    localStorage.setItem("wishListUser", JSON.stringify(user))
    this.router.navigate(["wishlist"])
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
