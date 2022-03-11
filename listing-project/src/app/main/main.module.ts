import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {AuthModule} from "../auth/auth.module";
import {ListingReactiveFormComponent} from "./listing-reactive-form/listing-reactive-form.component";
import {ListingsComponent} from "./listings/listings.component";
import {ListingItemComponent} from "./listing-item/listing-item.component";
//import { ListingTdComponent } from './listing/listing-td/listing-td.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,

  ],
  declarations: [
    MainComponent,
    ListingItemComponent,
    ListingReactiveFormComponent,
    ListingsComponent,
  ]
})
export class MainModule{
}
