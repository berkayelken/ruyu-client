import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './minnies.component.html',
  styleUrl: './minnies.component.css'
})
export class MinniesComponent implements OnInit {
  sildePicTemplate = "../../../assets/minnies/image";
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    slideTransition: 'linear',
    autoplayTimeout: 3100,
    autoplaySpeed: 1500,
    responsive: {
        0: {
            items: 3,
            loop:true
        },
        600: {
            items: 4,
            loop:true
        },
        1000: {
            items: 10,
            loop:true
        }
    }
}
activeSlides: SlidesOutputData = {};
slidesStore: any[] = [];

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 22; i++) {
      let image = this.sildePicTemplate + i + ".png";
      this.slidesStore.push({id: i, src: image})
    }
  }

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

}
