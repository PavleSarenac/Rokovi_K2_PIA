import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { MemberComponent } from './components/member/member.component';
import { LeaderComponent } from './components/leader/leader.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "member", component: MemberComponent },
  { path: "leader", component: LeaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
