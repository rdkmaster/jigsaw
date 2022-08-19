import {Component} from '@angular/core';
import {BadgeTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

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

export class BadgeMaxValueDemoComponent {
    public selectedLabel = {label: "中", size: "normal"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);

    public count: number = 100;

    constructor(public doc: BadgeTextService) {
    }
}
