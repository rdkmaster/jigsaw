import {Component} from "@angular/core";
import {SelectTextService} from "../text.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "option-width-select",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SelectOptionWidthComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    optionWidth = 400;
    constructor(public text: SelectTextService) {}

}
