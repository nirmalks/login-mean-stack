import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routing.module';
import { SignupComponent } from './signup/signup.component';
import { GoogleAuthService } from './services/google-auth.service';
import { baseUrl } from './shared/baseurl';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    NgSemanticModule,
      RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [GoogleAuthService,  {provide: 'BaseURL', useValue: baseURL}],
  bootstrap: [AppComponent]
})
export class AppModule { }
