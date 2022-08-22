import {
    Component, ElementRef, Renderer2
} from '@angular/core';
import {LoadingTextService} from "../doc.service";

@Component ( {
    selector: 'loading-color',
    templateUrl: './demo.component.html'
})
export class LoadingColorDemoComponent {
    public colors = ['rgb(0, 255, 0 )', 'rgb(0, 127, 255 )'];

    public paused = 'running';
    constructor(private _renderer: Renderer2,
                private _el: ElementRef,
                public doc: LoadingTextService) {
    }

    public setElementsStyle(tags: string, props: string, val: string | boolean | number) {
        const elements = this._el.nativeElement.querySelectorAll(tags);
        for (let index = 0; index < elements.length; ++index) {
            this._renderer.setStyle(elements[index], props, val);
        }
    }
}
