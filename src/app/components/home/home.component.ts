import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent {
  constructor(private router: Router) {}

  // Navigate to /flights
  navigateToFlights(): void {
    this.router.navigate(['/flights']);
  }
}
