import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  allProducts: Product[] = []

  constructor(private router: Router, private restService: RestService) {}

  ngOnInit(): void {
    this.restService.getAllProducts().subscribe(
      allProducts => {
        this.allProducts = allProducts
      }
    )
  }

  logout() {
    localStorage.removeItem("loggedInUser")
    this.router.navigate([""])
  }
}
