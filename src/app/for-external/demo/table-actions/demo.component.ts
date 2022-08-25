import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TableActionsAllComponent extends AsyncDescription {
    public demoPath = "demo/table-actions";

}

