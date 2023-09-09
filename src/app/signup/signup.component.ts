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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.registrationForm.valid) {
      // Handle form submission logic here
      console.log('Form submitted with data:', this.registrationForm.value);
    }
  }
}
