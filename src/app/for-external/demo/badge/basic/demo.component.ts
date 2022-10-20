import {Component} from '@angular/core';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'badge-basic',
    templateUrl: './demo.component.html',
    styles: [`
        .demo-showcase jigsaw-icon {
            margin-right: 50px;
            line-height: 1;
        }
    `]
})
export class BadgeBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/badge/basic";
    public selectedSize = { size: "normal" };

    public nice = "Nice";
    public dot = "dot";

    public cities = [
        { label: "北京", id: 1 },
        { label: "上海-一个很长的地址", id: 2 },
        { label: "南京", id: 3 },
        { label: "深圳", id: 4 },
        { label: "长沙", id: 5 },
        { label: "西安", id: 6 }
    ]
}
