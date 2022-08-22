import {Component} from "@angular/core";
import {FloatTextService} from "./doc.service";

@Component({
    templateUrl: 'demo.component.html'
})
export class FloatDemoComponent {
    constructor( public doc: FloatTextService) {
    }
}
