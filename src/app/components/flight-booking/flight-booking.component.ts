import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flight-booking',
  standalone: false,
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css'],
})
export class FlightBookingComponent implements OnInit {
  flightDetails: any;
  flightId: string | null = null;
  isLoading: boolean = true; // Flag to track loading state
  showSuccess: boolean = false; // Success popup visibility flag

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService
  ) {}

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id');

    if (this.flightId) {
      this.isLoading = true;

      this.flightsService.getFlights();

      this.flightsService.flights.subscribe((flights) => {
        if (flights.length > 0) {
          this.flightDetails = this.flightsService.getFlightById(
            this.flightId!
          );

          this.isLoading = false;
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

  bookFlight() {
    this.showSuccess = true; // Show success popup

    // Hide the popup after 5 seconds
    setTimeout(() => {
      this.showSuccess = false;
    }, 5000);
  }
}
