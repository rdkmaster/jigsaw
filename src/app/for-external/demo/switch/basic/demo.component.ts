import {Component} from "@angular/core";
import {SwitchTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "switch-basic",
    templateUrl: "./demo.component.html"
})

export class SwitchBasicComponent {
    public sizes: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "default"}
    ]);
    public checked: boolean;
    public selectedSize = {label: "中", size: "medium"};
    constructor(public doc: SwitchTextService) {}
}
