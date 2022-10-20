import {Component} from '@angular/core';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

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
    public selectedSize = { size: "normal" };

    public count: number = 100;
}
