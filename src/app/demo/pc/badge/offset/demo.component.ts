import {Component} from '@angular/core';
import {BadgeTextService} from "../text.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'offset-badge',
    templateUrl: './demo.component.html'
})

export class BadgeOffsetDemoComponent {
    hOffset1 = 0;
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

    constructor(public text: BadgeTextService) {
    }
}
