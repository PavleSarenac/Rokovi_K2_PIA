import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { UserComponent } from './components/user/user.component';
import { EventComponent } from './components/event/event.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "user", component: UserComponent },
  { path: "event", component: EventComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
