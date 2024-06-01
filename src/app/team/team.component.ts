import { Component } from '@angular/core';
import { RouterOutlet, RouterLink  } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

}
