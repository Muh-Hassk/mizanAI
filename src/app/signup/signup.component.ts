import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

interface AccountType {
  value: string;
  viewValue: string;
}





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent {
  selectedValue: string | undefined;
  Types: AccountType[] = [
    {value: 'Lawyer', viewValue: 'Lawyer'},
    {value: 'Judge', viewValue: 'Judge'},
    {value: 'Else', viewValue: 'Else'},
  ];
  loopArray = new Array(342);
  emailTakenError: string | null = null;
  usernameTakenError: string | null = null;  
  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    ) 
    {
  }
  hide = true;

  ngOnInit(): void {
    this.createForm();
  }


  registrationForm: FormGroup = new FormGroup({});


  createForm() {
    this.registrationForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(28), Validators.pattern(/^[A-Za-z]+$/)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(28), Validators.pattern(/^[A-Za-z]+$/)]],
      username: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.pattern(/^[A-Za-z_][A-Za-z0-9_]*$/)
        ],
        asyncValidators: [this.myAsyncValidatorUser.bind(this)]
      }),
      email: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.email,
        ],
        asyncValidators: [this.myAsyncValidatorEmail.bind(this)]
      }),
      password: ['', [Validators.required, Validators.minLength(6)]],
      accountType: ['', [Validators.required,]],
    });
  }
  
  
  submitForm(): void {
    const usernameControl = this.registrationForm.get('username');
    const emailControl = this.registrationForm.get('email');
  
    if (this.registrationForm?.valid) {
      const formData = {
        username: usernameControl?.value,
        email: emailControl?.value,
        first_name: this.registrationForm.get('first_name')?.value,
        last_name: this.registrationForm.get('last_name')?.value,
        password: this.registrationForm.get('password')?.value,
        accountType: this.registrationForm.get('accountType')?.value
      };
  
      this.http.post('http://localhost:8000/api/register', formData)
        .subscribe(
          () => {
            this.router.navigate(['login']);
          },
          (errorResponse) => {
            if (errorResponse.status === 400) {
              const errors = errorResponse.error;
              console.log(errors);
              if (errors.email && errors.email.length > 0) {
                this.emailTakenError = errors.email[0];
              } else {
                this.emailTakenError = null;
              }
              if (errors.username && errors.username.length > 0) {
                this.usernameTakenError = errors.username[0];
              } else {
                this.usernameTakenError = null;
              }
            } else {
              // Handle other types of errors (e.g., server errors) here.
            }
          }
        );
    }
  }
  
  myAsyncValidatorUser(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // ctrl.value <---- this is the current value of the input.
    return this.myHttpCallUser(ctrl.value).pipe(
      map((isAvailable: boolean) => (isAvailable ? null : { backendError: true })),
      catchError(() => of(null)) // Return null when there's a network error
    );
  }
  myAsyncValidatorEmail(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // ctrl.value <---- this is the current value of the input.
    return this.myHttpCallEmail(ctrl.value).pipe(
      map((isAvailable: boolean) => (isAvailable ? null : { backendError: true })),
      catchError(() => of(null)) // Return null when there's a network error
    );
  }
  
  
  myHttpCallUser(username: string): Observable<boolean> {
    const apiUrl = `http://localhost:8000/api/checkUsername/${username}/`;
    return this.http.get(apiUrl).pipe(
      tap((response: any) => console.log('API Response:', response)),
      map((response: any) => response.available === true),
      catchError((error) => {
        console.error('API Error:', error);
        return of(false);
      })
    );
  }
  myHttpCallEmail(username: string): Observable<boolean> {
    const apiUrl = `http://localhost:8000/api/checkEmail/${username}/`;
    return this.http.get(apiUrl).pipe(
      tap((response: any) => console.log('API Response:', response)),
      map((response: any) => response.available === true),
      catchError((error) => {
        console.error('API Error:', error);
        return of(false);
      })
    );
  }
}  


    

