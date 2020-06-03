import {Component} from '@angular/core';
import {AbstractGraphData} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: './demo.component.html'
})

export class GraphWithNoDataComponent {
    data: AbstractGraphData;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
