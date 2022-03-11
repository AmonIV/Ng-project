import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingReactiveFormComponent } from './listing-reactive-form.component';

describe('ListingReactiveFormComponent', () => {
  let component: ListingReactiveFormComponent;
  let fixture: ComponentFixture<ListingReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
