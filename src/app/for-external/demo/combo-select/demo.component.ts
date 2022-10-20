import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class ComboSelectComponent extends DemoSetBase {
    public demoPath = "demo/combo-select";
    public docPath = ['component/JigsawComboSelect'];
}
