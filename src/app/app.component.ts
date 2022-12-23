import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // para trabajar con standalone
  standalone: true,
  //add los modules necesarios
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud15-angular-standalone';
}
