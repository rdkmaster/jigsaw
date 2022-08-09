import {Component} from "@angular/core";
import {SwitchTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "switch-basic",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SwitchBasicComponent {
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "default"}
    ]);
    public checked: boolean;
    public selectedLabel = {label: "中", size: "medium"};
    constructor(public text: SwitchTextService) {}
}
