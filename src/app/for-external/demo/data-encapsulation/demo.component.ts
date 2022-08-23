import { Component } from "@angular/core";
import { DataEncapsulationTextService } from "./doc.service";

@Component({
    templateUrl: 'demo.component.html',
})
export class DataEncapsulationDemoComponent {
    constructor(public doc: DataEncapsulationTextService) {
    }
}
