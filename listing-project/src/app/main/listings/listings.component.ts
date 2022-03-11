import { Component, OnInit } from '@angular/core';
import { Listing } from '../models/listing.model';
import { ListingsService } from '../services/listings.service';
import { map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthService} from "../../auth/services/auth.service";
import {User} from "../../auth/models/user.model";

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {


  loggedUser! : User;

  listings!: Listing[];

  likedListing!: Listing;

  errorMessage!: string;

  constructor(private listingsService: ListingsService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.getContent();
    this.loggedUser = this.authService.getUserFromStorage();
  }

  onMarkAsLiked(listing: Listing): void {
    listing.likedBy.push(this.loggedUser.id!);
    this.listingsService.putListing$(listing).subscribe();
    //this.likedListing = listing;
  }

  onListingDelete(listingId: number): void {
    this.listingsService.deleteListing$(listingId).subscribe({
      next: () => {
        this.listings = this.listings.filter(listing => listing.id !== listingId);
      }
    });
  }

  private getContent(): void {
    this.listingsService.getListings$().pipe(
      map((response: Listing[]) => {
        const sortedResponse = response.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }

          if (a.title > b.title) {
            return 1;
          }

          return 0;
        });

        return sortedResponse;
      }),
      take(1)
    ).subscribe({
      next: (response: Listing[]) => {
        this.listings = response;
      },
      error: (response: HttpErrorResponse) => {
        this.errorMessage = response.message;
      }
    });
  }

  logout(): void
  {
    this.authService.logout();
  }

  delete(): void
  {
    this.authService.deleteUser$(this.loggedUser.id!).subscribe();
  }
}
