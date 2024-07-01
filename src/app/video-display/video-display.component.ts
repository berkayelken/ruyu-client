import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VideoDisplayComponent implements OnChanges {
  @Input() selectedVideo!: { id: number; title: string; src: string; info: string };
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  ngOnChanges() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.load();
    }
  }
}
