import { Injectable } from '@angular/core';

/**
 * Naive implementation of circular array index
 */
function calcCicularArrayIndex(position: number, size: number): number {
  return (position + size) % size;
}

export type SlideDirection = 'right' | 'left';

@Injectable()
export class CarouselService {
  slideDirection: SlideDirection = 'left';

  isMoving: boolean = false;
  length: number;
  active: number = 0;
  next: number = -1;
  prev: number = -1;

  slideTo(index: number, direction: SlideDirection): void {
    this.next = calcCicularArrayIndex(index, this.length);

    if (direction === null) {
      this.slideDirection = index > this.active ? 'right' : 'left';
    } else {
      this.slideDirection = direction;
    }
  }

  setLength(length: number): void {
    this.length = length;

    if (this.active >= length) {
      setTimeout(() => {this.active = 0});
    }
  }

  goToNext(): void {
    if (!this.isMoving) {
      this.slideTo(this.active + 1, 'right')
    }
  }

  goToPrev(): void {
    if (!this.isMoving) {
      this.slideTo(this.active - 1, 'left')
    }
  }

  onSetup(): void {
    this.isMoving = true;
    this.prev = this.active;
    this.active = this.next;
    this.next = -1;
  }

  onDone(): void {
    this.isMoving = false;
    this.prev = -1;
  }
}

