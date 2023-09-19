import { Component, OnInit, AfterViewInit } from '@angular/core';
import Typed from 'typed.js';
import { membersData } from './membersData';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  membersInfo = membersData;
  currentLang: string;
  constructor(public translate: TranslateService) {
    this.currentLang = translate.currentLang;
  }

  ngOnInit(): void {
  }

  

  ngAfterViewInit(): void {
    const typingEffect = new Typed('.multiText', {
      strings: ['Judge', 'Lawyer', 'Mizan AI', 'Assistant Tool'],
      loop: true,
      typeSpeed : 100,
      backSpeed: 80,
      backDelay: 150
    });
  }
}


