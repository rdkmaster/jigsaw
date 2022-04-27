import {Component} from "@angular/core";
import {RadiosGroupValue} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class RadioLiteDisabledDemoComponent {
    public selectedCity;
    public radioDisabled: boolean = false;
    public cities: (RadiosGroupValue | string)[] = [
        "北京",
        { label: "上海", disabled: false },
        { label: "南京", disabled: false },
        { label: "深圳", disabled: true },
        { label: "长沙", disabled: true },
        "西安"
    ];

    constructor() {
        this.selectedCity = "西安";
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
