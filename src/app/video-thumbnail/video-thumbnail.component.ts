import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VideoThumbnailComponent {
  @Input() video!: { id: number; title: string; src: string; info: string };
  @Output() click = new EventEmitter<any>();

  onClick() {
    this.click.emit(this.video);
  }
}
