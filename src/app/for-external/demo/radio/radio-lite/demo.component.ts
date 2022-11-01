import { Component } from "@angular/core";
import { RadiosGroupValue } from 'jigsaw/public_api';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "radio-radio-lite",
    templateUrl: "./demo.component.html"
})
export class RadioLiteComponent extends AsyncDescription {
    public demoPath = "demo/radio/radio-lite";

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
}
