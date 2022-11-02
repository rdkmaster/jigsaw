import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tooltip-scenes',
    templateUrl: './demo.component.html'
})
export class TooltipScenesDemoComponent extends AsyncDescription {
    public demoPath = "demo/tooltip/scenes";

}
