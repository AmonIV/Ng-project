import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Listing } from '../models/listing.model';
import { ListingsService } from '../services/listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-listing-reactive-form',
  templateUrl: './listing-reactive-form.component.html',
  styleUrls: ['./listing-reactive-form.component.scss']
})
export class ListingReactiveFormComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  loggedUserID!: number;

  listing: Listing;

  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private authService: AuthService
  ) {
    this.listing = {
      title: '',
      desc: '',
      likedBy : [],
      type: '',
      category: ''
    };
  }

  get titleFormControl(): FormControl {
    return this.formGroup?.get('title') as FormControl;
  }

  ngOnInit(): void {
    this.loggedUserID = this.authService.getUserFromStorage().id!;
    this.route.params.pipe(
      switchMap((params) => {
        if (params?.['id']) {
          return this.listingsService.getListing$(params?.['id']);
        }

        this.initForm();

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.listing = response;

          this.initForm();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    const listing: Listing = {
      id: this.formGroup.value.id,
      title: this.formGroup.value.title,
      type: this.formGroup.value.type,
      ownerID : this.loggedUserID!,
      likedBy : [],
      category: this.formGroup.value.category,
      desc: this.formGroup.value.desc
    };

    let request$;
    if (listing.id) {
      request$ = this.listingsService.putListing$(listing);
    } else {
      request$ = this.listingsService.postListing$(listing);
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(['/listings']);
      }
    });
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      id: this.listing.id,
      title: [this.listing.title, [Validators.required, Validators.maxLength(30)]],
      type: this.listing.type,
      category: this.listing.category,
      desc: this.listing.desc
    });
  }
}
