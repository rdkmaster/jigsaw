import {Component} from '@angular/core';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'badge-style',
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap jigsaw-icon {
            margin-right: 50px;
            line-height: 1;
        }
    `]
})

export class BadgeStyleDemoComponent extends AsyncDescription {
    public demoPath = "demo/badge/style";
    public selectedSize = { size: "normal" };
}
