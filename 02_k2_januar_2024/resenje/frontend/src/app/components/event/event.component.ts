import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Guest } from 'src/app/models/guest';
import { Response } from 'src/app/models/response';
import { User } from 'src/app/models/user';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: Event = new Event()
  loggedInUser: User = new User()
  guest: Guest = new Guest()
  message: string = ""

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.event = JSON.parse(localStorage.getItem("event")!)
    this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!)
    this.guest.korisnik = this.loggedInUser.kor_ime
  }

  registerForEvent() {
    this.message = ""
    this.restService.registerForEvent(this.guest, this.event).subscribe(
      (response: Response) => {
        if (response.message == "ok") {
          this.message = "Uspesno ste se prijavili za ovu proslavu!"
          this.event.dolazi.push(this.guest)
          localStorage.setItem("event", JSON.stringify(this.event))
        } else {
          this.message = "Vec ste prijavljeni ili za ovu ili za neku drugu proslavu na datum ove proslave!"
        }
      }
    )
  }

}
