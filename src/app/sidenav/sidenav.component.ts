import { Component, EventEmitter, HostListener, NgZone, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { TranslateService } from '@ngx-translate/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;

}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(public translate: TranslateService) {
    this.currentLang = translate.currentLang;
  }

currentLang: string;
@Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
collapsed = false;
screenWidth = 0;
navData = navbarData;

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.screenWidth = window.innerWidth;
  if(this.screenWidth <= 768) {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth:this.screenWidth });

  }
}
ngOnInit(): void {
  this.screenWidth = window.innerWidth;
  this.toggleLang();

}
toggleLang() {
  this.currentLang = this.currentLang === 'en' ? 'ar' : 'en'; // Toggle between 'en' and 'ar' or your language codes
  this.translate.use(this.currentLang);
}


toggleCollapse(): void {
  this.collapsed = !this.collapsed;
  this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth:this.screenWidth });
}
closeSidenav(): void {
  this.collapsed = false;
  this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth:this.screenWidth });
}

  

}
