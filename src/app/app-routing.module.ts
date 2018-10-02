import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FilmComponent } from './modules/film/film.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
