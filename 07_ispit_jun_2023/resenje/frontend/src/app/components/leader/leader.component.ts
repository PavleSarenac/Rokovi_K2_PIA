import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik.model';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {
  user: Korisnik = new Korisnik()
  teamMembers: Korisnik[] = []

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!)
    this.restService.getTeamMembers(this.user.tim).subscribe(
      (users) => {
        this.teamMembers = users
      }
    )
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
