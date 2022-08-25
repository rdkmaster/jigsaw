import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TableColumnDefinesAllComponent extends AsyncDescription {
    public demoPath = "demo/table-column-defines";

}

