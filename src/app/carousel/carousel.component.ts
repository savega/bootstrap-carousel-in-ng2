import { Component, Injectable, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CarouselItemComponent } from './carousel-item.component';
import { CarouselService } from './carousel.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  providers: [CarouselService]
})
export class CarouselComponent implements AfterContentInit {
  @ContentChildren(CarouselItemComponent)
  carouselItems: QueryList<CarouselItemComponent>;

  indicators: number[];

  constructor(private carousel: CarouselService) {
  }

  ngAfterContentInit() {
    this.init();

    this
      .carouselItems
      .changes
      .subscribe(s => this.init());
  }

  init() {
    this.carousel.setLength(this.carouselItems.length);
    this.indicators = this.carouselItems.map((item, index) => index);
  }

  get showControls(): boolean {
    return this.carouselItems.length > 1;
  }

  isActive(index: number): boolean {
    return this.carousel.active === index;
  }

  // Actions
  slideTo(index: number): void {
    this.carousel.slideTo(index, null);
  }

  next(): void {
    this.carousel.goToNext();
  }

  prev(): void {
    this.carousel.goToPrev();
  }
}


