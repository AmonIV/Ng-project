import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Listing } from '../models/listing.model';
import {User} from "../../auth/models/user.model";

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit{

  @Input() listing!: Listing;
  @Input() position!: number;
  @Input() loggedUser!: User;

  @Output() listingClicked: EventEmitter<Listing> = new EventEmitter<Listing>();
  @Output() listingDeleted: EventEmitter<number> = new EventEmitter<number>();



  alreadyLiked !: boolean;
  dbAlreadyLiked !: boolean;

  ngOnInit() {
    this.dbAlreadyLiked = this.listing.likedBy.includes(this.loggedUser.id!)
  }

  onClick(): void {
    this.listingClicked.emit(this.listing);
    this.alreadyLiked = true;
  }

  onDelete(): void {
    this.listingDeleted.emit(this.listing.id);
  }
}
