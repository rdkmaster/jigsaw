import {Component} from '@angular/core';
import {BadgeTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'badge-offset',
    templateUrl: './demo.component.html'
})

export class BadgeOffsetDemoComponent {
    hOffset1 = 20;
    hOffset2 = -10;
    list = [
        'bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece',
    ];

    public selectedLabel = {label: "中", size: "normal"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);

    constructor(public doc: BadgeTextService) {
    }
}
