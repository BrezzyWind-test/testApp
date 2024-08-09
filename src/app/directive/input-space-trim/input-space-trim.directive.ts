import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputSpaceTrim]',
})
export class InputSpaceTrimDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  trim(value: string) {
    this.el.nativeElement.value = value.replace(/\s/g, '');
  }
}
