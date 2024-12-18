import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private originalFlightsSource = new BehaviorSubject<any[]>([]);
  private flightsSource = new BehaviorSubject<any[]>([]);
  private suggestionsSource = new BehaviorSubject<string[]>([]);
  private searchValueSource = new BehaviorSubject<string>('');
  private filtered = new BehaviorSubject<any[]>([]);
  private minumumPrice = new BehaviorSubject<number>(0);
  private maximumPrice = new BehaviorSubject<number>(0);
  private startSliderValue = new BehaviorSubject<number>(0);
  private endSliderValue = new BehaviorSubject<number>(0);
  private numOfStops = new BehaviorSubject<number | null>(null); // Stops filter
  private refundability = new BehaviorSubject<boolean | null>(null);

  httpClient = inject(HttpClient);
  Subscription = new Subscription();

  flights = this.flightsSource.asObservable();
  filteredFlights = this.filtered.asObservable();
  suggestions = this.suggestionsSource.asObservable();
  searchValue = this.searchValueSource.asObservable();
  min = this.minumumPrice.asObservable();
  max = this.maximumPrice.asObservable();
  sliderStartValue = this.startSliderValue.asObservable();
  sliderEndValue = this.endSliderValue.asObservable();
  stops = this.numOfStops.asObservable();
  refundable = this.refundability.asObservable();

  constructor() {}

  // Fetch flights from the API
  getFlights() {
    this.Subscription.add(
      this.httpClient.get('/assets/response.json').subscribe({
        next: (response: any) => {
          const flights = response.airItineraries;
          this.originalFlightsSource.next(flights);
          this.flightsSource.next(flights);
          this.updateSuggestions(flights);
          this.getPriceRange(flights);
        },
        complete: () => console.log('Get flights completed'),
        error: (error: any) => console.error(error),
      })
    );
  }

  private updateSuggestions(flights: any[]): void {
    const uniqueSuggestions = [
      ...new Set(
        flights.map(
          (flight) => flight.allJourney.flights[0]?.flightAirline?.airlineName
        )
      ),
    ];
    this.suggestionsSource.next(uniqueSuggestions);
  }

  // Update search value and reapply filter
  updateSearchValue(searchInput: string): void {
    this.searchValueSource.next(searchInput);
    this.filterFlights(); // Trigger filtering when search input changes
  }

  // Update price range
  updatePriceRange(startValue: number, endValue: number): void {
    this.startSliderValue.next(startValue);
    this.endSliderValue.next(endValue);
    this.filterFlights(); // Trigger filtering when price range changes
  }

  // Update stops filter
  updateStopsFilter(selectedStop: number | null): void {
    this.numOfStops.next(selectedStop);
    this.filterFlights(); // Trigger filtering when stop value changes
  }

  updateRefundableFilter(refundable: boolean): void {
    this.refundability.next(refundable);
    this.filterFlights(); // Trigger filtering when refundable value changes
  }

  // Cancel refundability filter (show all flights)
  cancelRefundableFilter(): void {
    this.refundability.next(null); // Set filter to "null" to remove refundability filter
    this.filterFlights();
  }

  getPriceRange(flights: any[]): void {
    const minPrice = Math.min(
      ...flights.map((flight) => flight.itinTotalFare.amount)
    );
    const maxPrice = Math.max(
      ...flights.map((flight) => flight.itinTotalFare.amount)
    );
    this.minumumPrice.next(minPrice);
    this.maximumPrice.next(maxPrice);
  }

  getFlightById(id: string) {
    const flight = this.originalFlightsSource
      .getValue()
      .find((flight) => flight.sequenceNum === Number(id));
    return flight;
  }

  // Filter flights based on search value, price range, and number of stops
  private filterFlights(): void {
    const searchValue = this.searchValueSource.getValue().toLowerCase();
    const allFlights = this.originalFlightsSource.getValue();
    const minPrice = this.startSliderValue.getValue();
    const maxPrice = this.endSliderValue.getValue();
    const selectedStops = this.numOfStops.getValue();
    const isRefundable = this.refundability.getValue();

    let filteredFlights = allFlights;

    // Search value filter
    if (searchValue) {
      filteredFlights = filteredFlights.filter((flight) => {
        const airlineName =
          flight.allJourney.flights[0]?.flightAirline?.airlineName.toLowerCase() ||
          '';
        return airlineName.includes(searchValue);
      });
    }

    // Price range filter
    if (minPrice > 0 || maxPrice > 0) {
      filteredFlights = filteredFlights.filter((flight) => {
        const price = flight.itinTotalFare.amount || 0;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Stops filter
    if (selectedStops !== null) {
      filteredFlights = filteredFlights.filter((flight) => {
        const stops = flight.allJourney.flights[0].stopsNum;
        return stops === selectedStops;
      });
    }

    // Refundability filter
    if (isRefundable !== null) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.isRefundable === isRefundable
      );
    }

    // Update the filtered flights
    this.flightsSource.next(filteredFlights);
  }
}
