import { Component } from '@angular/core';
import { LoadingTextService } from "../doc.service";

@Component({
    selector: 'loading-color',
    templateUrl: './demo.component.html'
})
export class LoadingColorDemoComponent {
    constructor(public doc: LoadingTextService) { }
}
