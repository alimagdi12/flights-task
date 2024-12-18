import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightsDetailsComponent } from './components/flights-details/flights-details.component';
import { HomeComponent } from './components/home/home.component';
import { FlightBookingComponent } from './components/flight-booking/flight-booking.component';
const routes: Routes = [
  { path: '', component: HomeComponent }, // Root path
  { path: 'flights', component: FlightsComponent }, // Root path
  { path: 'details/:id', component: FlightsDetailsComponent },
  { path: 'book/:id', component: FlightBookingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
