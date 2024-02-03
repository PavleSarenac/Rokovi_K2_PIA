import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  username: string = ""
  password: string = ""
  error: string = ""

  constructor(private restService: RestService, private router: Router) { }

  login() {
    this.error = ""
    if (this.username == "" || this.password == "") {
      this.error = "Niste uneli sve podatke!"
      return
    }
    this.restService.login(this.username, this.password).subscribe(
      (user: User) => {
        if (user == null) {
          this.error = "Uneli ste pogresne podatke!"
        } else {
          localStorage.setItem("loggedInUser", JSON.stringify(user))
          this.router.navigate(["user"])
        }
      }
    )
  }
}
