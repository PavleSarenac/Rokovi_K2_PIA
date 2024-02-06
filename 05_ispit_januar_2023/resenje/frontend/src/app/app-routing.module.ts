import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AgencyComponent } from './components/agency/agency.component';
import { TravelerComponent } from './components/traveler/traveler.component';
import { BuyComponent } from './components/buy/buy.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "agency", component: AgencyComponent },
  { path: "traveler", component: TravelerComponent },
  { path: "buy", component: BuyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
