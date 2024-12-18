import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights-details',
  templateUrl: './flights-details.component.html',
  styleUrls: ['./flights-details.component.css'],
  standalone: false,
})
export class FlightsDetailsComponent implements OnInit {
  flightDetails: any;
  flightId: string | null = null;
  isLoading: boolean = true; // Flag to track loading state

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService
  ) {}

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id');

    if (this.flightId) {
      // Start loading
      this.isLoading = true;

      // Fetch flights data from the service
      this.flightsService.getFlights();

      // Subscribe to flights observable and find the flight by ID
      this.flightsService.flights.subscribe((flights) => {
        if (flights.length > 0) {
          this.flightDetails = this.flightsService.getFlightById(
            this.flightId!
          );

          if (this.flightDetails) {
            this.isLoading = false;
            console.log('Flight Details:', this.flightDetails);
          } else {
            console.log('No flight found with the given ID.');
            this.isLoading = false;
          }
        } else {
          console.log('No flights available.');
          this.isLoading = false;
        }
      });
    } else {
      console.log('Flight ID is missing');
      this.isLoading = false;
    }
  }
}
