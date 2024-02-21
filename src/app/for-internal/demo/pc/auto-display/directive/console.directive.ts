import { Input, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[myDirective]',
})
export class ConsoleDirective {
    constructor(private hostEl: ElementRef) {
        console.log('hostEl', this.hostEl);
    }
}
