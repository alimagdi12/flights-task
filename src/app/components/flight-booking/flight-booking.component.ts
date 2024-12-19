import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flight-booking',
  standalone: false, // Specifies that the component is not standalone, part of a larger module
  templateUrl: './flight-booking.component.html', // Path to the component's HTML template
  styleUrls: ['./flight-booking.component.css'], // Path to the component's CSS file
})
export class FlightBookingComponent implements OnInit {
  flightDetails: any; // Holds the details of the selected flight
  flightId: string | null = null; // Stores the flight ID retrieved from the route
  isLoading: boolean = true; // Flag to track the loading state of the component
  showSuccess: boolean = false; // Flag to control the visibility of the success popup

  constructor(
    private route: ActivatedRoute, // Injected service to access route parameters
    private flightsService: FlightsService // Injected service to handle flight data fetching
  ) {}

  ngOnInit(): void {
    // Fetch the 'id' route parameter to get the selected flight's ID
    this.flightId = this.route.snapshot.paramMap.get('id');

    // If the flight ID exists, proceed to fetch flight details
    if (this.flightId) {
      this.isLoading = true; // Set loading state to true when the API call starts

      // Fetch the list of flights from the FlightsService
      this.flightsService.getFlights();

      // Subscribe to the flights observable to handle the flight data once received
      this.flightsService.flights.subscribe((flights) => {
        // Check if flights are available
        if (flights.length > 0) {
          // Fetch details of the flight using the provided flight ID
          this.flightDetails = this.flightsService.getFlightById(
            this.flightId!
          );

          // Once data is loaded, set loading state to false
          this.isLoading = false;
        } else {
          console.log('No flights available.'); // Log message if no flights are available
          this.isLoading = false; // Set loading state to false when no flights are found
        }
      });
    } else {
      console.log('Flight ID is missing'); // Log message if the flight ID is not provided in the route
      this.isLoading = false; // Set loading state to false if no flight ID is found
    }
  }

  // Method to handle flight booking
  bookFlight() {
    this.showSuccess = true; // Set the success flag to true to display the success popup

    // Hide the success popup after 5 seconds
    setTimeout(() => {
      this.showSuccess = false; // Reset the success flag after 5 seconds
    }, 5000);
  }
}
