import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admin: User = new User()
  allUsers: User[] = []

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem("loggedInUser")!)
    this.restService.getAllUsers().subscribe(
      (users: User[]) => {
        this.allUsers = users.sort((user1, user2) => user2.potroseno - user1.potroseno)
      }
    )
  }

  adminPay(user: User) {
    this.restService.adminPay(user.korisnickoIme).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
