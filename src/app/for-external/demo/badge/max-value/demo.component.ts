import { Component } from '@angular/core';
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'badge-max-value',
    templateUrl: './demo.component.html',
    styles: [`
        .demo-showcase jigsaw-icon {
            margin-bottom: 10px;
            line-height: 1;
        }
    `]
})

export class BadgeMaxValueDemoComponent extends AsyncDescription {
    public demoPath = "demo/badge/max-value";

    public count: number = 100;

    public labelData: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "normal" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "normal" };
}
