import 'rxjs/add/observable/interval';

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const slides: any[] = [
  {
    imgAlt: 'First Slide',
    imgSrc: '/assets/slide1.svg'
  },
  {
    imgAlt: 'Second Slide',
    imgSrc: '/assets/slide2.svg'
  },
  {
    imgAlt: 'Third Slide',
    imgSrc: '/assets/slide3.svg'
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: any[] = slides;

  ngOnInit() {
      Observable
      .interval(5000)
      .subscribe(i => {
        this.items = slides.slice(0, i % 3 + 1);
      });
  }
}
