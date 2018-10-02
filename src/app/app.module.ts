import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FilmComponent } from './modules/film/film.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { page: 'dashboard' }
      },
      {
        path: 'film/:id',
        component: FilmComponent,
        data: { page: 'film' }
      },

    ])
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
