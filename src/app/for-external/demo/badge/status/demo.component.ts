import {Component} from '@angular/core';
import {BadgeTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'badge-status',
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap jigsaw-icon {
            margin-right: 50px;
            line-height: 1;
        }
    `]
})
export class BadgeStatusDemoComponent {
    public selectedLabel = {label: "中", size: "normal"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);

    constructor(public doc: BadgeTextService) {
    }
}
