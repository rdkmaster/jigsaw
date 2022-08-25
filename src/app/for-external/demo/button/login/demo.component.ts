import { Component } from '@angular/core';
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'button-login',
    templateUrl: './demo.component.html'
})
export class ButtonLoginComponent extends AsyncDescription {
    public demoPath = "demo/button/login";

    public onClick() {
        alert('Hello Jigsaw Button ^_^');
    }
    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" },
        { label: "默认", size: "default" }
    ]);
    public selectedSize = { label: "默认", size: "default" };
}
