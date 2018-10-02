import { Component } from '@angular/core';

import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width:'100%',
            opacity: 0
          }),
          {optional:true}),

        // move page off screen right on leave
        query(':leave',
          animate('1s ease',
            style({
              position: 'fixed',
              width:'100%',
              transform: 'translateX(100%)'
            })
          ),
        {optional:true}),

        // move page in screen from left to right
        query(':enter',
          animate('1s ease',
            style({
              opacity: 1
            })
          ),
        {optional:true}),
      ])
    ])
  ]
})
export class AppComponent {
  getPage(outlet) {
      return outlet.activatedRouteData['page'] || 'one';
    }
}
