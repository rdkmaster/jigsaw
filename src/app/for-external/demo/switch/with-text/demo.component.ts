import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {SwitchTextService} from "../doc.service";

@Component({
    selector: 'switch-with-text',
    templateUrl: './demo.component.html',
})
export class SwitchWithTextDemoComponent {
    public sizes: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "default"}
    ]);
    public checked: boolean;
    public selectedSize = {label: "中", size: "medium"};
    constructor(public doc: SwitchTextService) {}
}
