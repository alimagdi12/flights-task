import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: false,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  // Sidebar state
  isSidebarOpen: boolean = false;

  // Stops section state
  isStopsOpen: boolean = true;

  isRefundOpen: boolean = true;

  // Search input and suggestions
  showSuggestions: boolean = false;
  searchInput: string = '';
  suggestions: string[] = [];
  searchSuggestions: string[] = [];
  refundable: boolean = false;
  allRefundable: boolean = true; // "All" checkbox state

  // Slider price range values
  minimumPrice: number = 0;
  maximumPrice: number = 0;
  sliderStartValue: number = 0;
  sliderEndValue: number = 0;

  // Selected stop value
  selectedStop: number | null = null; // Will hold 0, 1, or 2 based on the user selection

  // Subscriptions to service observables
  subscription: Subscription = new Subscription();
  selectAll: any;

  constructor(private flightsService: FlightsService) {}

  ngOnInit(): void {
    // Subscribe to suggestions from the FlightsService
    this.flightsService.suggestions.subscribe((suggestions) => {
      this.suggestions = suggestions;
    });

    // Subscribe to minimum price value
    this.subscription.add(
      this.flightsService.min.subscribe((min) => {
        this.minimumPrice = min;
        this.sliderStartValue = this.minimumPrice;
      })
    );

    // Subscribe to maximum price value
    this.subscription.add(
      this.flightsService.max.subscribe((max) => {
        this.maximumPrice = max;
        this.sliderEndValue = this.maximumPrice;
      })
    );
  }

  // Toggle Sidebar Visibility
  toggleSidebar(event: Event): void {
    event.stopPropagation(); // Prevent document click
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Toggle Stops Section Visibility
  toggleStopsSection(): void {
    this.isStopsOpen = !this.isStopsOpen;
  }

  toggleRefundSection(): void {
    this.isRefundOpen = !this.isRefundOpen;
  }

  // Prevent event propagation
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  // Close Sidebar when clicking outside
  @HostListener('document:click', ['$event'])
  closeSidebar(event: Event): void {
    this.isSidebarOpen = false;
  }

  // Handle Search Input Change
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchInput = inputElement.value;

    // Update search value and immediately apply filter
    this.flightsService.updateSearchValue(this.searchInput);

    // Filter suggestions based on search input
    this.searchSuggestions = this.suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  // Update the slider price range
  onSliderChange(): void {
    this.flightsService.updatePriceRange(
      this.sliderStartValue,
      this.sliderEndValue
    );
  }

  // Handle suggestion selection
  selectSuggestion(suggestion: string): void {
    this.searchInput = suggestion; // Set input value to the selected suggestion
    this.showSuggestions = false; // Hide the suggestions list
    this.searchSuggestions = []; // Clear current suggestions list

    // Update the search value in FlightsService
    this.flightsService.updateSearchValue(this.searchInput);
  }

  // Handle stop selection change
  onStopChange(): void {
    console.log('Selected Stop Value:', this.selectedStop);
    // Call the FlightsService to update stops filter
    this.flightsService.updateStopsFilter(Number(this.selectedStop));
  }

  onAllRefundChange(event: any): void {
    this.allRefundable = event.checked;
    if (this.allRefundable) {
      this.flightsService.cancelRefundableFilter(); // Remove refundability filter
    } else {
      this.flightsService.updateRefundableFilter(this.refundable); // Apply specific refundability filter
    }
  }

  onSelectAllChange(event: any){
    this.selectAll = event.checked;
    this.flightsService.cancelRefundableFilter()
  }

  onRefundChange(event: any): void {
    this.refundable = event.checked;
    this.flightsService.updateRefundableFilter(this.refundable);
  }

  // Clean up subscriptions on component destroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
