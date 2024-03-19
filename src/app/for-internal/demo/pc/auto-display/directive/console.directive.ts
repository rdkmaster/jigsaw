import { Input, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[myDirective]',
})
export class ConsoleDirective {
    constructor(public hostEl: ElementRef, private _renderer: Renderer2) {
        console.log('hostEl', this.hostEl);
        setTimeout(() => {
            this._renderer.setStyle(this.hostEl.nativeElement, 'background', 'red');
        }, 100);
    }
}
