import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlightRefundable]', // The selector used in HTML templates to apply this directive
  standalone: false, // Marks the directive as not standalone (it can be part of a module)
})
export class HighlightRefundableDirective implements OnChanges {
  @Input() appHighlightRefundable!: boolean | string; // Input property to accept a value indicating refundability

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Detects when the input value changes and triggers the updateStyles method
  ngOnChanges(changes: SimpleChanges): void {
    if ('appHighlightRefundable' in changes) {
      this.updateStyles(); // Update styles whenever the input changes
    }
  }

  // Private method to update the element's styles based on refundability status
  private updateStyles(): void {
    // Convert the input to a boolean to check if it represents a refundable item
    const isRefundable =
      typeof this.appHighlightRefundable === 'string'
        ? this.appHighlightRefundable.toLowerCase() === 'yes'
        : !!this.appHighlightRefundable;

    // If refundable, apply styles for "refundable" background
    if (isRefundable) {
      this.renderer.setStyle(
        this.el.nativeElement, // Element to apply styles to
        'background-color', // Set background color
        '#4CAF50' // Green color
      );
      this.renderer.setStyle(this.el.nativeElement, 'padding', '10px'); // Add padding
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', '10px'); // Add rounded corners
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white'); // Set text color to white
      this.renderer.setStyle(this.el.nativeElement, 'width', 'auto'); // Set width to auto
    } else {
      // If not refundable, apply styles for "non-refundable" background
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red'); // Red color
      this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', '10px');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
      this.renderer.setStyle(this.el.nativeElement, 'width', 'auto');
    }
  }
}
