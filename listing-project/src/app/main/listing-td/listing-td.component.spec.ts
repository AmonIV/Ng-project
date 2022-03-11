import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTdComponent } from './listing-td.component';

describe('ListingTdComponent', () => {
  let component: ListingTdComponent;
  let fixture: ComponentFixture<ListingTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingTdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
