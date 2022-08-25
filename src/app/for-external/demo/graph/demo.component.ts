import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: 'demo.component.html'
})
export class GraphDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph";

}
