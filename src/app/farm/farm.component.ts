import { Component } from '@angular/core';
import { RouterOutlet, RouterLink  } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './farm.component.html',
  styleUrl: './farm.component.css'
})
export class FarmComponent {

}
