import { Component } from '@angular/core';
import { RouterOutlet, RouterLink  } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.css'
})
export class StudioComponent {

}
