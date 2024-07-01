import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VideoInfoComponent {
  @Input() videoInfo!: string;
  @Input() infoTitle!: string;
  @Input() infoImage!: string;
}
