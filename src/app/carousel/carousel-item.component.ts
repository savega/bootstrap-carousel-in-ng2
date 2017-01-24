import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/core';
import { CarouselService } from './carousel.service';

export type ItemState = 'void' | 'left' | 'right' | 'active';

@Component({
  animations: [
    trigger('carousel', [

      state('active', style({transform: 'translateX(0)'})),
      state('left',   style({transform: 'translateX(-100%)'})),
      state('right',  style({transform: 'translateX(100%)'})),

      transition('active <=> left',  animate('500ms ease')),
      transition('active <=> right', animate('500ms ease')),
    ])
  ],
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent {
  @Input() index: number;

  constructor(private carousel: CarouselService) {
  }

  getState(): ItemState {
    if (this.index === this.carousel.active) {
      return 'active';
    }
    if (this.index === this.carousel.next) {
      return this.carousel.slideDirection === 'left' ? 'left' : 'right';
    }
    if (this.index === this.carousel.prev) {
      return this.carousel.slideDirection === 'left' ? 'right' : 'left';
    }

    return 'void';
  }


  getClass(): string {
    if (this.index === this.carousel.active) {
      return 'active';
    }
    if (this.index === this.carousel.next) {
      return 'next';
    }
    if (this.index === this.carousel.prev) {
      return 'prev';
    }

    return '';
  }

  onStateChange($event: any): void {
    if ($event.fromState === 'void' && ($event.toState === 'left' || $event.toState === 'right')) {
      this.carousel.onSetup();
    }
    if ($event.fromState === 'active') {
      this.carousel.onDone();
    }
  }
}
