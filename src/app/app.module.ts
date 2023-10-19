import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SignupRoutingModule } from './signup/signup-routing.module';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageComponent } from './shared/component/message/message.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { UnauthoraizedPageComponent } from './unauthoraized-page/unauthoraized-page.component';







@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent,
        ProfileComponent,
        ChatWindowComponent,
        MessageComponent,
        ChatSidebarComponent,
        UnauthoraizedPageComponent,

    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        MatIconModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatListModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        FontAwesomeModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NgIf,
        MatIconModule,
        MatButtonModule,
        SignupRoutingModule,
        HttpClientModule,
        MatInputModule,
        TranslateModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
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
