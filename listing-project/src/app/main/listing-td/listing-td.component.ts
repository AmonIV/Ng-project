import { Component, OnInit, ViewChild } from '@angular/core';
import { Listing } from '../models/listing.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listing-td',
  templateUrl: './listing-td.component.html',
  styleUrls: ['./listing-td.component.scss']
})
export class ListingTdComponent implements OnInit {

  @ViewChild('form') ngForm!: NgForm;

  listing!: Listing;

  constructor() {
    this.listing = {
      title: '',
      category: '',
    };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.ngForm);
  }
}
