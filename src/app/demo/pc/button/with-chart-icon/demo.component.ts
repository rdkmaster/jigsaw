import {Component} from "@angular/core";
import {ButtonTextService} from "../doc.service";

@Component({
    selector: 'button-with-chart-icon',
    templateUrl: './demo.component.html'
})
export class ButtonWithChartIconDemoComponent {
    constructor(public text: ButtonTextService) {}
}
