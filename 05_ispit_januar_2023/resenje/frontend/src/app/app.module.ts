import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgencyComponent } from './components/agency/agency.component';
import { TravelerComponent } from './components/traveler/traveler.component';
import { BuyComponent } from './components/buy/buy.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AgencyComponent,
    TravelerComponent,
    BuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
