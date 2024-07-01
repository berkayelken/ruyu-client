import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
  
} from '@angular/core'

@Component({
  selector: 'app-tweet-embed',
  templateUrl: './tweet-embed.component.html',
  styleUrls: ['./tweet-embed.component.css'],
  imports: [
    CommonModule
  ],
  standalone: true,
})
export class TweetEmbedComponent implements OnInit, AfterViewInit {
  @Input() tweetEmbedCode!: string
  loaded = false
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.tweetEmbedCode) {
      console.error('Tweet embed code is required')
    }
  }

  ngAfterViewInit(): void {
    this.loadTweet()
  }

  loadTweet() {
      const div = this.renderer.createElement('div')
      div.innerHTML = this.tweetEmbedCode;
      this.renderer.appendChild(this.el.nativeElement, div)
      this.addTwitterScript();
  }

  addTwitterScript() {
    const script = this.renderer.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    this.renderer.appendChild(this.el.nativeElement, script)
  }
}
