import { Component } from "@angular/core";
import { RadiosGroupValue } from 'jigsaw/public_api';
import {RadioTextService} from "../doc.service";

@Component({
    selector: "radio-lite",
    templateUrl: "./demo.component.html"
})
export class RadioLiteComponent {
    public selectedItem: RadiosGroupValue | string;
    public selectedItem1: RadiosGroupValue | string;
    public cities: (RadiosGroupValue | string)[] = [
        "选项1",
        "选项2",
        "选项3",
        "选项4",
    ];
    public forbidden: (RadiosGroupValue | string[]) = [
        { label: "禁用1", disabled: true },
        { label: "禁用2", disabled: true },
        { label: "禁用3", disabled: true },
        { label: "禁用4", disabled: true }
    ]

    constructor( public doc: RadioTextService) {
    }
}
