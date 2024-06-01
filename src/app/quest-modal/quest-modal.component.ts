import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
// @ts-ignore
const $: any = window['$']

@Component({
  selector: 'app-quest-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quest-modal.component.html',
  styleUrl: './quest-modal.component.css'
})
export class QuestModalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @ViewChild('questModal') modal?: ElementRef;
  title: string = '';
  content: string = '';


  openModal(title: string, content: string) {
    this.title = title;
    this.content = content;
    console.log("şalolo")
    $(this.modal?.nativeElement).modal('show');

  }

  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }
}