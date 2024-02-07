import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aukcija } from 'src/app/models/aukcija';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-prodavac',
  templateUrl: './prodavac.component.html',
  styleUrls: ['./prodavac.component.css']
})
export class ProdavacComponent implements OnInit {
  allAuctions: Aukcija[] = []
  currentDateTime: string = ""

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.currentDateTime = this.restService.getCurrentDateTimeString()
    this.restService.getAllAuctions().subscribe(
      (auctions: Aukcija[]) => {
        this.allAuctions = auctions
      }
    )
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
