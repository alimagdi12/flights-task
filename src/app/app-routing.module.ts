import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightsDetailsComponent } from './components/flights-details/flights-details.component';
import { HomeComponent } from './components/home/home.component';
import { FlightBookingComponent } from './components/flight-booking/flight-booking.component';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  { path: '', component: HomeComponent }, // Root path
  { path: 'flights', component: FlightsComponent, canActivate: [AuthGuard] }, // Root path
  {
    path: 'details/:id',
    component: FlightsDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/:id',
    component: FlightBookingComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
