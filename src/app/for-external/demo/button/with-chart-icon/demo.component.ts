import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'button-with-chart-icon',
    templateUrl: './demo.component.html'
})
export class ButtonWithChartIconDemoComponent extends AsyncDescription {
    public demoPath = "demo/button/with-chart-icon";

}
