import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingItemComponent } from './main/listing-item/listing-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListingReactiveFormComponent } from './main/listing-reactive-form/listing-reactive-form.component';
import { ListingsComponent } from './main/listings/listings.component';
import {HttpClientModule} from "@angular/common/http";
import { Router, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
