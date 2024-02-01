import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { WorkerComponent } from './components/worker/worker.component';

const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "buyer", component: BuyerComponent},
  {path: "worker", component: WorkerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
