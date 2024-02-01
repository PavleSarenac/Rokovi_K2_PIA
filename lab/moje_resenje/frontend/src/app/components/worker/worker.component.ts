import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem("loggedInUser")
    this.router.navigate([""])
  }
}
