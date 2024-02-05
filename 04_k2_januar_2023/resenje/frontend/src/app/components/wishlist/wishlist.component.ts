import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  buyer: User = new User()
  receiver: User = new User()
  wishList: Product[] = []

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.buyer = JSON.parse(localStorage.getItem("loggedInUser")!)
    this.receiver = JSON.parse(localStorage.getItem("wishListUser")!)
    this.restService.getWishList(this.receiver.korisnickoIme).subscribe(
      (wishList: Product[]) => {
        this.wishList = wishList
      }
    )
  }

  buy(product: Product, isAnonymous: boolean) {
    product.anonimno = isAnonymous
    product.kupio = this.buyer.korisnickoIme
    this.buyer.naStanju -= product.cena
    this.buyer.potroseno += product.cena
    localStorage.setItem("loggedInUser", JSON.stringify(this.buyer))
    this.restService.subtractMoney(this.buyer.korisnickoIme, product.cena).subscribe(
      () => {
        this.restService.buyPresent(this.receiver.korisnickoIme, product).subscribe(
          () => {
            this.ngOnInit()
          }
        )
      }
    )
  }

  back() {
    localStorage.removeItem("wishListUser")
    this.router.navigate(["user"])
  }
}
