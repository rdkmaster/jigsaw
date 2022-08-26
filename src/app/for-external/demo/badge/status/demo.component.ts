import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

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
export class BadgeStatusDemoComponent extends AsyncDescription {
    public demoPath = "demo/badge/status";
    public selectedSize = {size: "normal"};
}
