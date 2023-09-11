import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgSwitch, NgSwitchCase, AsyncPipe, CommonModule} from '@angular/common';
import { SignupData } from './signupData';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent {
  hide = true;

onClick() {
console.log("Clicked");

}
currentLang: string;
  constructor(public translate: TranslateService,private fb: FormBuilder) {
    this.currentLang = translate.currentLang;
  }

  ngOnInit(): void {
    this.toggleLang();
    this.createForm();
  }

  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en'; // Toggle between 'en' and 'ar' or your language codes
    this.translate.use(this.currentLang);
  }

  IconsData = SignupData;
  login = 'login'

  registrationForm: FormGroup = new FormGroup({});


  createForm() {
    this.registrationForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(28), Validators.pattern(/^[A-Za-z]+$/)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(28), Validators.pattern(/^[A-Za-z]+$/)]],
      username: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z_][A-Za-z0-9_]*$/)
      ]],
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  

  submitForm() {
    if (this.registrationForm.valid) {
      console.log('Form submitted with data:', this.registrationForm.value);
      this.registrationForm.reset({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
      });
    }
  }
}
