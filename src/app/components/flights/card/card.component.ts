import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card', // Component selector for use in templates
  templateUrl: './card.component.html', // Path to the component's HTML template
  styleUrls: ['./card.component.css'], // Path to the component's CSS file
  standalone: false, // Specifies that the component is not standalone, part of a larger module
})
export class CardComponent implements OnInit {
  @Input() flight: any; // Input property to receive flight data from parent component
  currentLanguage: string = 'en'; // Holds the current language code, defaulting to English

  constructor(private router: Router, public translate: TranslateService) {}

  ngOnInit() {
    // Initialize the current language by fetching it from the TranslateService or defaulting to 'en'
    this.currentLanguage = this.translate.currentLang || 'en';

    // Subscribe to language change events to update the current language when the user switches languages
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang; // Update the language when a change occurs
    });
  }

  // Method to navigate to the flight details page
  navigateToDetails(flightKey: string): void {
    this.router.navigate(['/details/', flightKey]); // Navigate to the details page with the given flightKey
  }

  // Method to navigate to the flight booking page
  navigateToBooking(flightKey: string): void {
    this.router.navigate(['/book/', flightKey]); // Navigate to the booking page with the given flightKey
  }
}
