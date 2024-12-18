# Flight Booking Angular Application

This is an Angular-based flight booking application that allows users to search for flights, view detailed information, and book flights. It incorporates features such as multi-language support, dynamic flight filtering, and real-time flight data from a service.

## Features

- **Search Flights**: Users can search flights based on airlines, departure/arrival cities, and other criteria.
- **Flight Details**: Detailed flight information including departure/arrival cities, baggage info, price, and taxes.
- **Booking**: Users can book flights, with a success popup shown after booking.
- **Multi-language Support**: Switch between English and Arabic (or other languages as configured).
- **Flight Filtering**: Users can filter flights based on price, number of stops, and refundability.
- **Loading States**: Visual feedback is provided while data is being loaded.
- **Sidebar**: A sidebar with a search bar and filters is available for an enhanced user experience.

## Components

### `FlightBookingComponent`
- Displays the details of a selected flight.
- Handles flight booking and shows a success popup.
- Uses `ActivatedRoute` to retrieve the flight ID from the URL.

### `CardComponent`
- Displays individual flight information.
- Provides buttons to navigate to detailed flight views and booking.

### `FlightsComponent`
- Displays a list of available flights fetched from the service.
- Supports language switching and shows available flights.

### `FlightsDetailsComponent`
- Displays detailed flight information for a specific flight based on the flight ID.
- Handles loading states while fetching data.

### `SearchBarComponent`
- Provides a search bar for filtering flights.
- Includes sidebar functionality and handles search input, price filtering, and refundability filters.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/flight-booking-angular.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    ng serve
    ```

4. Open your browser and navigate to `http://localhost:4200` to view the application.

## Services

### `FlightsService`
- A service that provides flight data and handles API calls.
- Manages filters and flight suggestions.
- Subscribes to changes in the flight data and reflects updates in the UI.

### `TranslateService`
- Used to manage translations for multi-language support.

## Dependencies

- `@angular/core`: Core Angular library.
- `@angular/router`: For routing and navigation.
- `@ngx-translate/core`: For multi-language support.
- `rxjs`: For reactive programming with observables.
- `mat-slider`: Material slider for price range filtering.
- `mat-radio-button`, `mat-checkbox`, `mat-icon`: Material components for UI elements.
- `ngx-currency`: Custom pipe for currency formatting.

## Usage

1. **Search Flights**: Enter the airline name or city in the search bar and view filtered flight options.
2. **View Details**: Click on a flight card to see detailed information like departure/arrival times, baggage information, price breakdown, and taxes.
3. **Book Flight**: Click the "Book Flight" button on a flight card to book your flight. A success message will appear for 5 seconds after booking.
4. **Apply Filters**: Use the sidebar to filter flights by price range, number of stops, and refundability.

## Contributing

Feel free to fork this repository and make improvements. To contribute, please:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

