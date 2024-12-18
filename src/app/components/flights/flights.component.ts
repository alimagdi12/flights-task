import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
  standalone: false,
})
export class FlightsComponent implements OnInit, OnDestroy {
  flights: any[] = [];
  subscription: Subscription = new Subscription();
  currentLanguage: string = 'en'; // Set the default language to 'en'

  constructor(
    private flightsService: FlightsService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    if (browserLang && browserLang.match(/en|ar/)) {
      translate.use(browserLang);
    } else {
      translate.use('en');
    }
  }

  ngOnInit(): void {
    this.subscription.add(
      this.flightsService.flights.subscribe((flights) => {
        this.flights = flights;
        console.log('Flights received:', flights);
      })
    );

    this.flightsService.getFlights();
  }

  switchLanguage() {
    // Toggle the language between 'en' and 'ar'
    const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.translate.use(newLang);
    this.currentLanguage = newLang;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
