import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  username: string = ""
  password: string = ""
  userType: string = ""
  error: string = ""

  constructor(private restService: RestService, private router: Router) { }

  login() {
    this.error = ""
    if (this.username == "" || this.password == "" || this.userType == "") {
      this.error = "Niste uneli sve podatke!"
      return
    }
    this.restService.login(this.username, this.password, this.userType).subscribe(
      (user: Korisnik) => {
        if (user == null) {
          this.error = "Uneli ste pogresne podatke!"
          return
        }
        localStorage.setItem("user", JSON.stringify(user))
        if (user.tip == "kupac") {
          this.router.navigate(["kupac"])
        } else {
          this.router.navigate(["radnik"])
        }
      }
    )
  }
}
