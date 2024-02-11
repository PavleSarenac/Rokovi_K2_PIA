import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik.model';
import { Zadatak } from 'src/app/models/zadatak.model';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  newAssignment: Zadatak = new Zadatak()
  user: Korisnik = new Korisnik()
  teamMembers: Korisnik[] = []
  assignee: string = ""
  allMyAssignments: Zadatak[] = []

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!)
    this.restService.getTeamMembers(this.user.tim).subscribe(
      (users: Korisnik[]) => {
        this.teamMembers = users
      }
    )
    this.restService.getMyAssignments(this.user.korisnicko_ime).subscribe(
      (assignments: Zadatak[]) => {
        this.allMyAssignments = assignments
      }
    )
  }

  assign() {
    this.newAssignment.dodeljen = this.assignee
    if (this.assignee == this.user.korisnicko_ime) this.newAssignment.tip = "licni"
    else this.newAssignment.tip = "delegiran"
    this.restService.assign(this.newAssignment).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  deleteAssignment(assignment: Zadatak) {
    this.restService.deleteAssignment(assignment).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  moveToDone(assignment: Zadatak) {
    this.restService.done(assignment).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  returnToUndone(assignment: Zadatak) {
    this.restService.returnToUndone(assignment).subscribe(
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
