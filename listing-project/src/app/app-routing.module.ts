import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './main/listings/listings.component';
import { ListingReactiveFormComponent } from './main/listing-reactive-form/listing-reactive-form.component';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren : ()=> import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: '',
    loadChildren : ()=> import('./main/main.module').then(m=>m.MainModule),
    canLoad:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
