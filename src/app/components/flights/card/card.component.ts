import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: false,
})
export class CardComponent implements OnInit {
  @Input() flight: any;
  currentLanguage: string = 'en';

  constructor(private router: Router, public translate: TranslateService) {}

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
  }
  navigateToDetails(flightKey: string): void {
    this.router.navigate(['/details/', flightKey]);
  }

  navigateToBooking(flightKey: string): void {
    this.router.navigate(['/book/', flightKey]);
  }
}
