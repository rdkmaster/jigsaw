import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'badge-offset',
    templateUrl: './demo.component.html'
})

export class BadgeOffsetDemoComponent extends AsyncDescription {
    public demoPath = "demo/badge/offset";
    public selectedSize = {size: "normal"};

    hOffset1 = 20;
    hOffset2 = -10;
    list = [
        'bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece',
    ];
}
