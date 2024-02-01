import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KupacComponent } from './kupac/kupac.component';
import { LoginComponent } from './login/login.component';
import { RadnikComponent } from './radnik/radnik.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "kupac", component: KupacComponent },
  { path: "radnik", component: RadnikComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
