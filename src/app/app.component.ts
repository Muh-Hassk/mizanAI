import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mizanAI';
  isSideNavCollapsed = false;
  screenWidth = 0;
  currentLang: string;


  constructor(public translate: TranslateService) {
    this.currentLang = translate.currentLang;
  }

  ngOnInit(): void {
    this.toggleLang();
  
  }
  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en'; // Toggle between 'en' and 'ar' or your language codes
    this.translate.use(this.currentLang);
  }
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    }
  }

