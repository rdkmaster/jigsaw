import {Component} from '@angular/core';
import {BadgeTextService} from "../text.service";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    selector: 'position-badge',
    templateUrl: './demo.component.html'
})

export class BadgePositionDemoComponent {
    public selectedLabel = {label: "中", size: "normal"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);

    list = [
        'bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece',
    ];

    constructor(public text: BadgeTextService) {
    }
}
