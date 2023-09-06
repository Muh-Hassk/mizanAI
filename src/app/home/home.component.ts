import { Component, OnInit, AfterViewInit } from '@angular/core';
import Typed from 'typed.js';
import { membersData } from './membersData';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  membersInfo = membersData;
  constructor() { }

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


