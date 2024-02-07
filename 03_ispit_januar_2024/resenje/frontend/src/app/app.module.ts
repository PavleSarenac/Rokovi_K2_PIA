import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './components/index/index.component';
import { KupacComponent } from './components/kupac/kupac.component';
import { ProdavacComponent } from './components/prodavac/prodavac.component';
import { UmetnineComponent } from './components/umetnine/umetnine.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    KupacComponent,
    ProdavacComponent,
    UmetnineComponent
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
