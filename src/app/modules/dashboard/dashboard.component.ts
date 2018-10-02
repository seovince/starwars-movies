import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { trigger, transition, style, animate, stagger, query } from "@angular/animations";
import { Http, Response } from '@angular/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
      trigger('listAnimation', [
        transition('* => *', [
          query(':enter', [
            style({ opacity: 0 }),
            stagger(200, [
              animate('0.5s', style({ opacity: 1 }))
            ])
          ])
        ]),
      ]),
    ],
})

export class DashboardComponent {

  private apiUrl = 'https://swapi.co/api/films/';
  data: any = {};
  dataLength: any = [];

  dataLoaded: boolean = false;
  filmContent: boolean = false;

  constructor(private http: Http) {
    this.getContent();
  }

  getData() {
    return this.http.get(this.apiUrl)
      .pipe(
        map((res: Response) => res.json() )
      )
  }

  getContent() {
    this.getData().subscribe(dataApi => {
      this.data = dataApi;
      this.dataLoaded = true;
    })
  }

  filterBy(prop: string) {
    if(this.data.results !== undefined) {
      this.data.results.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    }

    return this.data.results;
  }
}
