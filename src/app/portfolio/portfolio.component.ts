import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoDisplayComponent } from '../video-display/video-display.component';
import { VideoInfoComponent } from '../video-info/video-info.component';
import { VideoThumbnailComponent } from '../video-thumbnail/video-thumbnail.component';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    CarouselModule,
    VideoDisplayComponent,
    VideoInfoComponent,
    VideoThumbnailComponent
  ]
})
export class PortfolioComponent implements OnInit {
  videos = [
    { id: 1, title: 'Video 1', src: 'assets/portfolio/video1.mp4', info: '', thumbnail: 'assets/portfolio/thumbnail1.png', infoTitle: 'Alexander Albiz', infoImage: 'assets/portfolio/info1.png' },
    { id: 2, title: 'Video 2', src: 'assets/portfolio/video3.mp4', info: '', thumbnail: 'assets/portfolio/thumbnail3.png', infoTitle: 'Dennis Buara', infoImage: 'assets/portfolio/info3.jpg' },
    { id: 3, title: 'Video 3', src: 'assets/portfolio/video2.mov', info: '', thumbnail: 'assets/portfolio/thumbnail2.png', infoTitle: 'Yoh', infoImage: 'assets/info2.jpg' },
    { id: 4, title: 'Video 4', src: 'assets/portfolio/video4.mp4', info: '', thumbnail: 'assets/portfolio/thumbnail4.png', infoTitle: 'Yui Abuy', infoImage: 'assets/info4.jpg' },
    { id: 5, title: 'Video 5', src: 'assets/portfolio/video5.mp4', info: '', thumbnail: 'assets/portfolio/thumbnail5.jpg', infoTitle: 'Graham', infoImage: 'assets/info5.jpg' },
  ];

  selectedVideo = this.videos[0];
  videoInfo = this.videos[0].info;
  infoTitle = this.videos[0].infoTitle;
  infoImage = this.videos[0].infoImage;

  artistImages = [
    { id: 1, title: '', src: 'assets/olly/img1.jpg', thumbnail: 'assets/olly/img1.jpg' },
    { id: 2, title: '', src: 'assets/olly/img2.jpg', thumbnail: 'assets/olly/img2.jpg' },
    { id: 3, title: '', src: 'assets/olly/img3.jpg', thumbnail: 'assets/olly/img3.jpg' },
    { id: 4, title: '', src: 'assets/olly/img4.jpg', thumbnail: 'assets/olly/img4.jpg' },
    { id: 5, title: '', src: 'assets/olly/img5.jpg', thumbnail: 'assets/olly/img5.jpg' },
    { id: 6, title: '', src: 'assets/olly/img6.jpg', thumbnail: 'assets/olly/img6.jpg' },
    { id: 7, title: '', src: 'assets/olly/img7.jpg', thumbnail: 'assets/olly/img7.jpg' },
    { id: 8, title: '', src: 'assets/olly/img8.jpg', thumbnail: 'assets/olly/img8.jpg' },
    { id: 9, title: '', src: 'assets/olly/img9.jpg', thumbnail: 'assets/olly/img9.jpg' },
    { id: 10, title: '', src: 'assets/olly/img10.jpg', thumbnail: 'assets/olly/img10.jpg' },
    { id: 11, title: '', src: 'assets/olly/img11.jpg', thumbnail: 'assets/olly/img11.jpg' },
    { id: 12, title: '', src: 'assets/olly/img12.jpg', thumbnail: 'assets/olly/img12.jpg' },
    { id: 13, title: '', src: 'assets/olly/img13.jpg', thumbnail: 'assets/olly/img13.jpg' },
    { id: 14, title: '', src: 'assets/olly/img14.jpg', thumbnail: 'assets/olly/img14.jpg' },
    { id: 15, title: '', src: 'assets/olly/img15.jpg', thumbnail: 'assets/olly/img15.jpg' },
  ];

  selectedArtistImage = this.artistImages[0];
  artistInfo = 'Main Concept/Background Artist';
  artistTitle = 'Oleksandr Klakov';
  artistImage = ''; //'assets/artist/artist-info.jpg';

  // Pixel Artist Section
  pixelArtistImages = [
    { id: 1, title: '', src: 'assets/onedsoul/img1.png', thumbnail: 'assets/onedsoul/img1.png' },
    { id: 2, title: '', src: 'assets/onedsoul/img2.png', thumbnail: 'assets/onedsoul/img2.png' },
    { id: 3, title: '', src: 'assets/onedsoul/img3.png', thumbnail: 'assets/onedsoul/img3.png' },
    { id: 4, title: '', src: 'assets/onedsoul/img4.png', thumbnail: 'assets/onedsoul/img4.png' },
    { id: 5, title: '', src: 'assets/onedsoul/img5.png', thumbnail: 'assets/onedsoul/img5.png' },
    { id: 6, title: '', src: 'assets/onedsoul/img6.png', thumbnail: 'assets/onedsoul/img6.png' },
    { id: 7, title: '', src: 'assets/onedsoul/img7.png', thumbnail: 'assets/onedsoul/img7.png' },
    { id: 8, title: '', src: 'assets/onedsoul/img8.png', thumbnail: 'assets/onedsoul/img8.png' },
    { id: 9, title: '', src: 'assets/onedsoul/img9.png', thumbnail: 'assets/onedsoul/img9.png' },
    { id: 10, title: '', src: 'assets/onedsoul/img10.gif', thumbnail: 'assets/onedsoul/img10.gif' },
    { id: 11, title: '', src: 'assets/onedsoul/img11.g,f', thumbnail: 'assets/onedsoul/img11.gif' },
    { id: 12, title: '', src: 'assets/onedsoul/img12.gif', thumbnail: 'assets/onedsoul/img12.gif' },
    { id: 13, title: '', src: 'assets/onedsoul/img13.gif', thumbnail: 'assets/onedsoul/img13.gif' },
    { id: 14, title: '', src: 'assets/onedsoul/img14.gif', thumbnail: 'assets/onedsoul/img14.gif' },
    { id: 15, title: '', src: 'assets/onedsoul/img15.gif', thumbnail: 'assets/onedsoul/img15.gif' },
    { id: 16, title: '', src: 'assets/onedsoul/img16.gif', thumbnail: 'assets/onedsoul/img16.gif' },
    { id: 17, title: '', src: 'assets/onedsoul/img17.gif', thumbnail: 'assets/onedsoul/img17.gif' },
  ];

  selectedPixelArtistImage = this.pixelArtistImages[0];
  pixelArtistInfo = 'Main Pixel Artist';
  pixelArtistTitle = 'OnedSoul';
  pixelArtistImage = ''; //'assets/artist/artist-info.jpg';


  // 3D Artist Section
  threeDArtistImages = [
    { id: 1, title: '', src: 'assets/nemo/img1.png', thumbnail: 'assets/nemo/img1.png' },
    { id: 2, title: '', src: 'assets/nemo/img2.png', thumbnail: 'assets/nemo/img2.png' },
    { id: 3, title: '', src: 'assets/nemo/img3.png', thumbnail: 'assets/nemo/img3.png' },
    { id: 4, title: '', src: 'assets/nemo/img4.png', thumbnail: 'assets/nemo/img4.png' },
    { id: 5, title: '', src: 'assets/nemo/img5.png', thumbnail: 'assets/nemo/img5.png' },
    { id: 6, title: '', src: 'assets/nemo/img6.png', thumbnail: 'assets/nemo/img6.png' },
    { id: 7, title: '', src: 'assets/nemo/img7.png', thumbnail: 'assets/nemo/img7.png' },
    { id: 8, title: '', src: 'assets/nemo/img8.png', thumbnail: 'assets/nemo/img8.png' },
    { id: 9, title: '', src: 'assets/nemo/img9.png', thumbnail: 'assets/nemo/img9.png' },
    { id: 10, title: '', src: 'assets/nemo/img10.png', thumbnail: 'assets/nemo/img10.png' },
    { id: 11, title: '', src: 'assets/nemo/img11.png', thumbnail: 'assets/nemo/img11.png' },
    { id: 12, title: '', src: 'assets/nemo/img12.png', thumbnail: 'assets/nemo/img12.png' },
    { id: 13, title: '', src: 'assets/nemo/img13.png', thumbnail: 'assets/nemo/img13.png' },
    
  ];

  selectedthreeDArtistImage = this.threeDArtistImages[0];
  threeDArtistInfo = 'Main 3D Artist';
  threeDArtistTitle = 'Nemo Chen';
  threeDArtistImage = ''; //'assets/artist/artist-info.jpg';

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoHeight: true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 5
      },
      1000: {
        items: 5
      }
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.selectedVideo = this.videos[0];
    this.videoInfo = this.videos[0].info;
    this.infoTitle = this.videos[0].infoTitle;
    this.infoImage = this.videos[0].infoImage;

    this.selectedArtistImage = this.artistImages[0];
    this.selectedPixelArtistImage = this.pixelArtistImages[0];
  }

  selectVideo(video: any) {
    this.selectedVideo = video;
    this.videoInfo = video.info;
    this.infoTitle = video.infoTitle;
    this.infoImage = video.infoImage;
  }

  selectArtistImage(image: any) {
    this.selectedArtistImage = image;
  }

  selectPixelArtistImage(image: any) {
    this.selectedPixelArtistImage = image;
  }

  selectthreeDArtistImage(image: any) {
    this.selectedthreeDArtistImage = image;
  }
}
