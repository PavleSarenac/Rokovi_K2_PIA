import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { KupacComponent } from './components/kupac/kupac.component';
import { ProdavacComponent } from './components/prodavac/prodavac.component';
import { NarudzbinaComponent } from './components/narudzbina/narudzbina.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "kupac", component: KupacComponent },
  { path: "radnik", component: ProdavacComponent },
  { path: "narudzbina", component: NarudzbinaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
