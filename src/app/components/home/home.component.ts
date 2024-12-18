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

  // Navigate to /flights and save login status to local storage
  navigateToFlights(): void {
    // Save login status to local storage
    localStorage.setItem('login', 'true');

    // Navigate to the flights page
    this.router.navigate(['/flights']);
  }
}
