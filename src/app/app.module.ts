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
import { SearchPageComponent } from './search-page/search-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyFanficPageComponent } from './my-fanfic-page/my-fanfic-page.component';
import { EditFanficPageComponent } from './edit-fanfic-page/edit-fanfic-page.component';
import { MyFavaritesPageComponent } from './my-favarites-page/my-favorites-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes = [
  { path: '', component: HomePageComponent },
  { path: 'fanfic/id/:id', component: ReadFanficPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'fanfic/add', component: AddFanficPageComponent },
  { path: 'registration', component: RegisterPageComponent },
  { path: 'fanfic/search', component: SearchPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'profile/my_fanfics', component: MyFanficPageComponent },
  { path: 'fanfic/edit_fanfic/:id', component: EditFanficPageComponent },
  { path: 'profile/favorite/my_favorite_fanfics', component: MyFavaritesPageComponent }
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
    SearchPageComponent,
    ProfilePageComponent,
    MyFanficPageComponent,
    EditFanficPageComponent,
    MyFavaritesPageComponent,

  ],
  imports: [
    BrowserModule,
    MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatBadgeModule,
    MatTabsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
