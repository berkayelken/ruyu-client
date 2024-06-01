import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';
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
            items: 4,
            loop:true
        },
        600: {
            items: 6,
            loop:true
        },
        1000: {
            items: 12,
            loop:true
        }
    }
}
activeSlides: SlidesOutputData = {};
slidesStore: any[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    for(let i = 0; i < 22; i++) {
      let image = this.sildePicTemplate + i + ".png";
      this.slidesStore.push({id: i, src: image})
    }
  }



  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

  private injectScript(src: string) {
    if (this.document && src?.trim()) {
      const script = this.document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", src.trim());
      this.document.head?.appendChild(script);
    }
  }

  private injectScriptWithIntegrity(src: string, integrity: string, crossorigin: string) {
    if (this.document && src?.trim()) {
      const script = this.document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", src.trim());
      script.setAttribute("integrity", integrity);
      script.setAttribute("crossorigin", crossorigin);
      this.document.head?.appendChild(script);
    }
  }
}
