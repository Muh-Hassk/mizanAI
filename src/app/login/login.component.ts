import { Component } from '@angular/core';
import { iconsData } from './LoginData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterEvent } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loopArray = new Array(342);
  wrongCredentials = false;
  constructor
  (
    public translate: TranslateService,
     private fb: FormBuilder,
     private http: HttpClient,
     private router: Router
  ) 
  {
  }
  hide = true;

  ngOnInit(): void {
    this.createForm();
  }

  
  loginForm: FormGroup = new FormGroup({});

  createForm() {
    this.loginForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z_][A-Za-z0-9_]*$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {  
    
    const formData = this.loginForm.getRawValue();
  
    // Make a POST request to the login API
    this.http.post('http://localhost:8000/api/login', formData,{
      withCredentials: true
    }).subscribe(
      (response) => {
        // Successful login, navigate to the profile page
        this.router.navigate(['/new']);
      },
      (error) => {
        if (error.status === 403) {
          // Handle authentication errors (status code 403 - Forbidden)
          console.log("Error Status: 403 - Forbidden");
          const errorResponse = error.error;
  
          if (errorResponse.detail === "User not found!") {
            // Handle incorrect username error
            console.log("Error Status: Incorrect Username");
            this.loginForm.get('username')?.setErrors({ serverError: errorResponse.detail });
          } else if (errorResponse.detail === "incorrect Password") {
            // Handle incorrect password error
            console.log("Error Status: Incorrect Password");
            this.loginForm.get('password')?.setErrors({ serverError: errorResponse.detail });
          } else {
            // Handle other types of authentication errors
            console.log("Error Status: Unknown Authentication Error");
            // Optionally, you can set a general error message here
            // this.loginForm.setErrors({ serverError: "Authentication failed." });
          }
        } else {
          // Handle other types of errors, e.g., network error
          console.error("Error Status: " + error.status);
          // Optionally, you can handle other errors here
        }
      }
    );
  }
  
}
