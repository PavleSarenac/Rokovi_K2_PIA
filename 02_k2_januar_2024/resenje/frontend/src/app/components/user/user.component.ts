import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { Response } from 'src/app/models/response';
import { User } from 'src/app/models/user';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loggedInUser: User = new User()
  updatedUser: User = new User()
  friend: string = ""
  allFutureEvents: Event[] = []
  allUsersEvents: Event[] = []
  currentDateString: string = new Date().toISOString().substring(0, 10)
  newEvent: Event = new Event()
  newEventCreationMessage: string = ""

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!)
    this.restService.getAllFutureEvents().subscribe(
      (events: Event[]) => {
        this.allFutureEvents = events
      }
    )
    this.restService.getAllUsersEvents(this.loggedInUser.kor_ime).subscribe(
      (events: Event[]) => {
        this.allUsersEvents = events.sort((event1, event2) => event1.datum.localeCompare(event2.datum))
      }
    )
  }

  deleteAllFriends() {
    this.updatedUser.prijatelji = []
  }

  addFriend() {
    this.updatedUser.prijatelji.push(this.friend)
  }

  updateUserInfo() {
    this.friend = ""
    this.updatedUser.kor_ime = this.loggedInUser.kor_ime
    this.updatedUser.lozinka = this.loggedInUser.lozinka
    if (this.updatedUser.ime == "") this.updatedUser.ime = this.loggedInUser.ime
    if (this.updatedUser.prezime == "") this.updatedUser.prezime = this.loggedInUser.prezime
    if (this.updatedUser.mejl == "") this.updatedUser.mejl = this.loggedInUser.mejl
    if (this.updatedUser.prijatelji.length == 0) this.updatedUser.prijatelji = this.loggedInUser.prijatelji
    this.loggedInUser = this.updatedUser
    localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser))
    this.updatedUser = new User()
    this.restService.updateUserInfo(this.loggedInUser).subscribe()
  }

  showEventDetails(event: Event) {
    localStorage.setItem("event", JSON.stringify(event))
    this.router.navigate(["event"])
  }

  cancelEvent(event: Event) {
    this.restService.cancelEvent(event.naziv).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  createNewEvent() {
    this.newEventCreationMessage = ""
    if (this.newEvent.naziv == "" || this.newEvent.mesto == "" || this.newEvent.datum == "") {
      this.newEventCreationMessage = "Niste uneli sve podatke!"
      return
    }
    this.newEvent.organizator = this.loggedInUser.kor_ime
    this.restService.createNewEvent(this.newEvent, this.loggedInUser.kor_ime).subscribe(
      (response: Response) => {
        this.newEventCreationMessage = response.message
        this.ngOnInit()
      }
    )
    this.newEvent = new Event()
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
