import { Component } from '@angular/core';
import { RouterOutlet, RouterLink  } from '@angular/router';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
// import { CarouselModule_1 as CarouselModule } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './nftcollection.component.html',
  styleUrl: './nftcollection.component.css'
})
  
export class NftcollectionComponent {
  cardString = "../../../assets/nftcollection/card";
slidesStore: any[] = [];
currentImages: any[] = [];


  constructor() { }

  ngOnInit(): void {
    for(let i = 1; i < 9; i++) {
      let image = this.cardString + i + ".webp";
      this.slidesStore.push({id: i, src: image})
    }

    this.loadRandomImages();
    setInterval(() => {
      this.loadRandomImages();
    }, 9000);
  }

  loadRandomImages(): void {
    let newImages: any[];
    do {
      newImages = this.getRandomImages(3);
    } while (this.arraysIntersect(newImages, this.currentImages));

    this.currentImages = newImages;
  }

  getRandomImages(count: number): any[] {
    const randomIndices = this.getRandomIndices(count, this.slidesStore.length);
    return randomIndices.map(index => this.slidesStore[index]);
  }

  getRandomIndices(count: number, max: number): number[] {
    const indices:any[] = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  }

  arraysIntersect(arr1: any[], arr2: any[]): boolean {
    return arr1.some(item1 => arr2.some(item2 => item1.id === item2.id));
  }
}




 


