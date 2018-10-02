import { Component } from '@angular/core';
import { trigger, transition, style, animate, stagger, query } from "@angular/animations";
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from "@angular/router";
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})

export class FilmComponent {

  private apiUrl = 'https://swapi.co/api/films/';
  param: any;
  data: any = {};
  species: any = [];
  starships: any = [];
  planets: any = [];
  characters: any = [];
  dataLoaded: boolean = false;
  flagAccordion: boolean = false;

  constructor(private http: Http, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.param = params );
    this.getContent();
  }

  ngAfterViewChecked() {
    if(this.flagAccordion) {
      this.setupAccordion();
      this.flagAccordion = false;
    }
  }

  getData(url: string) {
    return this.http.get(url)
      .pipe(
        map((res: Response) => res.json() )
      )
  }

  getContent() {

    this.getData(this.apiUrl).subscribe(dataApi => {
      const temp = dataApi.results.filter( eps => eps.episode_id == this.param.id);
      this.data = temp[0];

      this.getSpecies(this.data.species.length);
      this.getStarships(this.data.starships.length);
      this.getPlanets(this.data.planets.length);
      this.getCharacters(this.data.characters.length);

      this.flagAccordion = true;
      this.dataLoaded = true;
    })
  }

  getSpecies(length: number) {
    for(let i = 0; i < length; i++) {
        this.getData(this.data.species[i]).subscribe(speciesApi => {
          this.species.push(speciesApi);
        })
    }

  }

  getStarships(length: number) {
    for(let i = 0; i < length; i++) {
        this.getData(this.data.starships[i]).subscribe(starshipsApi => {
          this.starships.push(starshipsApi);
        })
    }
  }

  getPlanets(length: number) {
    for(let i = 0; i < length; i++) {
        this.getData(this.data.planets[i]).subscribe(planetsApi => {
          this.planets.push(planetsApi);
        })
    }
  }

  getCharacters(length: number) {
    for(let i = 0; i < length; i++) {
        this.getData(this.data.characters[i]).subscribe(charactersApi => {
          this.characters.push(charactersApi);
        })
    }
  }

  setupAccordion() {
    let acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  filterBy(arr: any) {
    arr.sort( (a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })

    return arr;
  }

  openGoogle(q: string) {
    window.open('http://google.com/search?q='+q);
  }

}
