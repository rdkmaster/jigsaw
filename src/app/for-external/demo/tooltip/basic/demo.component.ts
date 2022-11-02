import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tooltip-basic',
    templateUrl: './demo.component.html'
})
export class TooltipBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/tooltip/basic";

    public tooltipMessage: string = '一个提示';
}
