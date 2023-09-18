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
  currentLang: string;
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
    this.currentLang = translate.currentLang;
  }
  hide = true;

  ngOnInit(): void {
    this.toggleLang();
    this.createForm();
  }

  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en'; // Toggle between 'en' and 'ar' or your language codes
    this.translate.use(this.currentLang);
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

  submitForm() {
    this.wrongCredentials = true;
    if (this.loginForm.valid) {
      this.http.post('http://localhost:8000/api/login', this.loginForm.getRawValue(),{
        withCredentials: true
      })
      .subscribe(() => this.router.navigate(['/profile']));
    }
   
  }
}
