import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home', // The selector used to render this component in the template
  templateUrl: './home.component.html', // Path to the component's HTML template
  styleUrls: ['./home.component.css'], // Path to the component's CSS file
  standalone: false, // Indicates that the component is part of a module, not standalone
})
export class HomeComponent {
  constructor(private router: Router) {} // Injecting Router to navigate programmatically

  // Method to navigate to the flights page and save login status to local storage
  navigateToFlights(): void {
    // Save login status to local storage to indicate user is logged in
    localStorage.setItem('login', 'true');

    // Navigate to the '/flights' route
    this.router.navigate(['/flights']);
  }
}
