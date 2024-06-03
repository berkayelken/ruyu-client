import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink  } from '@angular/router';

@Component({
  selector: 'app-thelore',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './thelore.component.html',
  styleUrl: './thelore.component.css'
})
export class TheloreComponent {

}
