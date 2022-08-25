import {Component} from '@angular/core';
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'badge-offset',
    templateUrl: './demo.component.html'
})

export class BadgeOffsetDemoComponent extends AsyncDescription {
    public demoPath = "demo/badge/offset";

    hOffset1 = 20;
    hOffset2 = -10;
    list = [
        'bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece',
    ];

    public selectedSize = {label: "中", size: "normal"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);
}
