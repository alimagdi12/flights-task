import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flights', // Component selector to use this component in templates
  templateUrl: './flights.component.html', // Path to the HTML template for this component
  styleUrls: ['./flights.component.css'], // Path to the CSS file for this component
  standalone: false, // Specifies that this component is not standalone and is part of a larger module
})
export class FlightsComponent implements OnInit, OnDestroy {
  flights: any[] = []; // Array to hold the list of flights
  subscription: Subscription = new Subscription(); // Subscription to hold the flight data observable
  currentLanguage: string = 'en'; // Stores the current selected language (default is 'en')

  constructor(
    private flightsService: FlightsService, // Injecting the FlightsService to fetch flight data
    private translate: TranslateService // Injecting the TranslateService to handle language translations
  ) {
    // Set the default language to 'en' and attempt to use the browser's preferred language
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang(); // Get the browser's language setting
    if (browserLang && browserLang.match(/en|ar/)) {
      translate.use(browserLang); // Use 'en' or 'ar' based on the browser language
    } else {
      translate.use('en'); // Default to 'en' if the browser language is neither 'en' nor 'ar'
    }
  }

  ngOnInit(): void {
    // Subscribe to the flights observable to receive flight data
    this.subscription.add(
      this.flightsService.flights.subscribe((flights) => {
        this.flights = flights; // Store the received flights data in the 'flights' array
        console.log('Flights received:', flights); // Log the received flight data
      })
    );

    // Fetch the flight data from the FlightsService
    this.flightsService.getFlights();
  }

  // Method to toggle between 'en' and 'ar' languages
  switchLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'ar' : 'en'; // Toggle the language
    this.translate.use(newLang); // Apply the new language using TranslateService
    this.currentLanguage = newLang; // Update the current language
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable when the component is destroyed to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
