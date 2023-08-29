import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SignupRoutingModule } from './signup/signup-routing.module';




@NgModule({
    declarations: [
        AppComponent,
        BodyComponent,
        SidenavComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent,
        ProfileComponent,

    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        FontAwesomeModule,
        HttpClientModule,
        SignupRoutingModule,
        TranslateModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory:httpTranslateLoader ,
            deps: [HttpClient]
          }
        })
    ]
})
export class AppModule { 
}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
