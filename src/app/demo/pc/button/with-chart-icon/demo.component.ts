import {Component} from "@angular/core";
import {ButtonTextService} from "../text.service";

@Component({
    selector: 'with-chart-icon-button',
    templateUrl: './demo.component.html'
})
export class ButtonWithChartIconDemoComponent {
    constructor(public text: ButtonTextService) {}
}
