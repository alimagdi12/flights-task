import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights-details', // Component selector for template usage
  templateUrl: './flights-details.component.html', // Path to the component's HTML template
  styleUrls: ['./flights-details.component.css'], // Path to the component's CSS file
  standalone: false, // Indicates the component is part of a module, not standalone
})
export class FlightsDetailsComponent implements OnInit {
  flightDetails: any; // Holds the details of the flight to be displayed
  flightId: string | null = null; // Stores the flight ID extracted from the URL
  isLoading: boolean = true; // Flag to track loading state, initialized as true

  constructor(
    private route: ActivatedRoute, // Injecting ActivatedRoute to access route parameters
    private flightsService: FlightsService // Injecting FlightsService to fetch flight data
  ) {}

  ngOnInit(): void {
    // Retrieve the 'id' parameter from the route snapshot
    this.flightId = this.route.snapshot.paramMap.get('id');

    if (this.flightId) {
      // If a flight ID exists, begin the loading process
      this.isLoading = true;

      // Fetch the list of flights from the service
      this.flightsService.getFlights();

      // Subscribe to the flights observable to receive the flight data
      this.flightsService.flights.subscribe((flights) => {
        // Check if any flights are available
        if (flights.length > 0) {
          // Find the flight details using the provided flight ID
          this.flightDetails = this.flightsService.getFlightById(
            this.flightId!
          );

          // If the flight details are found, stop loading and log the details
          if (this.flightDetails) {
            this.isLoading = false;
            console.log('Flight Details:', this.flightDetails);
          } else {
            // If no flight found with the given ID, log a message
            console.log('No flight found with the given ID.');
            this.isLoading = false;
          }
        } else {
          // If no flights are available, log a message
          console.log('No flights available.');
          this.isLoading = false;
        }
      });
    } else {
      // If no flight ID is provided in the URL, log an error message
      this.isLoading = false;
    }
  }
}
