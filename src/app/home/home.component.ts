import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, RouterModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

import { CommonModule } from '@angular/common';


