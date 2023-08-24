import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
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


  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }
    else if(this.collapsed&& this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
     }
     return styleClass;
  }
}