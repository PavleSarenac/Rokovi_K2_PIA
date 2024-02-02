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
	user: User = new User()
	errorMessage: string = ""

	constructor(private restService: RestService, private router: Router) { }

	login() {
		this.errorMessage = ""
		if (this.user.kor_ime == "" || this.user.lozinka == "" || this.user.tip == "") {
			this.errorMessage = "Niste uneli sve podatke!"
			return
		}
		this.restService.login(this.user).subscribe(
			(userFromDatabase: User) => {
				if (userFromDatabase == null) {
					this.errorMessage = "Uneli ste lose podatke!"
					return
				}
				localStorage.setItem("loggedInUser", JSON.stringify(userFromDatabase))
				if (userFromDatabase.tip == "kupac") {
					this.router.navigate(["buyer"])
				} else {
					this.router.navigate(["worker"])
				}
			}
		)
	}
}
