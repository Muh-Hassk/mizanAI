import { Component } from '@angular/core';
import { iconsData } from './LoginData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RouterEvent } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentLang: string;
loopArray = new Array(342);
  constructor(public translate: TranslateService,private fb: FormBuilder) {
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
  registrationForm: FormGroup = new FormGroup({});


  createForm() {
    this.registrationForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z_][A-Za-z0-9_]*$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  

  submitForm() {
    if (this.registrationForm.valid) {
      console.log('Form submitted with data:', this.registrationForm.value);
      this.registrationForm.reset({
        username: '',
        password: ''
      });
    }
  }
}


