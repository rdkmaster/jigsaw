import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class ListAllComponent extends AsyncDescription {
    public demoPath = "demo/list";

}

