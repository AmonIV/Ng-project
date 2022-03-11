import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {switchMap, takeUntil} from "rxjs/operators";
import {of, Subject} from "rxjs";
import {Listing} from "../../main/models/listing.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  user : User;
  destroy$ = new Subject<boolean>();

  get usernameFormControl(): FormControl {
    return this.formGroup?.get('username') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup?.get('password') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.formGroup?.get('email') as FormControl;
  }

  get typeFormControl(): FormControl {
    return this.formGroup?.get('type') as FormControl;
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.user = {
      username : '',
      password : '',
      email: '',
      role: ''
    };
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params?.['id']) {
          this.user = this.authService.getUserFromStorage();
          this.initForm();
        }

        this.initForm();

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.user = response;

          this.initForm();
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initForm(): void
  {
    this.formGroup = this.fb.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      email: [this.user.email,[Validators.required,Validators.email]],
      type: [this.user.role,Validators.required]
    });
  }


  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }
    const user: User = {
      username: this.formGroup.value.username,
      password: this.formGroup.value.password,
      email: this.formGroup.value.email,
      role: this.formGroup.value.type
    }

    let request$;
    if(user.id)
    {
      request$ = this.authService.putUser$(user);
    }
    else
    {
      request$ = this.authService.createUser$(user);
    }
    request$.subscribe(()=>{
      this.router.navigate(['login'])
    });
  }
}
