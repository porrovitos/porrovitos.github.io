import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReadFanficPageComponent } from './read-fanfic-page/read-fanfic-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { NavComponent } from './nav/nav.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AddFanficPageComponent } from './add-fanfic-page/add-fanfic-page.component';
import { CookieService } from 'ngx-cookie-service';

const routes = [
  {path: '', component: HomePageComponent},
  {path: 'fanfic/id/:id', component: ReadFanficPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'fanfic/add', component: AddFanficPageComponent},
  {path: 'registration', component: RegisterPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ReadFanficPageComponent,
    HomePageComponent,
    NavComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddFanficPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
