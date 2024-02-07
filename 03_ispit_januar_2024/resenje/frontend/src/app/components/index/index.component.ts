import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private restService: RestService) { }

  login() {
    this.error = ""
    if (this.username == "" || this.password == "" || this.userType == "") {
      this.error = "Niste uneli sve podatke!"
      return
    }
    this.restService.login(this.username, this.password, this.userType).subscribe(
      (user: any) => {
        if (user == null) {
          this.error = "Uneli ste lose podatke!"
          return
        }
        localStorage.setItem("user", JSON.stringify(user))
        if (user.tip == "kupac") {
          this.router.navigate(["kupac"])
        } else {
          this.router.navigate(["prodavac"])
        }
      }
    )
  }
}
