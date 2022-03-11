import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AclGuard } from '../guards/acl.guard';
import {ListingsComponent} from "./listings/listings.component";
import {ListingReactiveFormComponent} from "./listing-reactive-form/listing-reactive-form.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'listings',
        component: ListingsComponent
      },
      {
        path: 'listings/create',
        component: ListingReactiveFormComponent,
        //canActivate: [AclGuard]
      },
      {
        path: 'listings/edit/:id',
        component: ListingReactiveFormComponent,
        //canActivate: [AclGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listings'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
