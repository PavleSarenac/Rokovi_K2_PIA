import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "user", component: UserComponent },
  { path: "admin", component: AdminComponent },
  { path: "wishlist", component: WishlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
