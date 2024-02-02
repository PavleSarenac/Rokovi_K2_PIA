import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  allWaitingProducts: Product[] = []
  loggedInUser: User = new User()

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.restService.getAllWaitingProducts().subscribe(
      (allWaitingProducts: Product[]) => {
        this.allWaitingProducts = allWaitingProducts
      }
    )
    this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!)
  }

  approveProduct(product: Product) {
    this.restService.updateProductStatus(product.id, "u prodavnici", product.cena).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  rejectProduct(product: Product) {
    this.restService.updateProductStatus(product.id, "odbijeno", 0.0).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  logout() {
    localStorage.removeItem("loggedInUser")
    this.router.navigate([""])
  }
}
