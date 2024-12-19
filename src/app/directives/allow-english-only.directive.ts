import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowEnglishOnly]', // Directive selector to be used in HTML templates
  standalone: false, // Indicates this directive is not standalone
})
export class AllowEnglishOnlyDirective {
  // Regular expression to allow only English letters and spaces
  private regex: RegExp = /^[a-zA-Z\s]*$/;

  constructor() {}

  // Listen for the input event on the element to validate user input
  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;

    // Check if the input value matches the regex, otherwise clean it up
    if (!this.regex.test(input.value)) {
      // Remove any non-English characters from the input value
      input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    }
  }

  // Listen for the keypress event to prevent non-English characters from being typed
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const key = String.fromCharCode(event.keyCode || event.which);

    // If the key pressed does not match the regex, prevent it from being entered
    if (!this.regex.test(key)) {
      event.preventDefault(); // Prevent the default action (i.e., typing the character)
    }
  }
}
