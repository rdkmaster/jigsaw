import {Component} from '@angular/core';
import {BadgeTextService} from "../doc.service";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    selector: 'badge-basic',
    templateUrl: './demo.component.html',
    styles: [`
        .demo-showcase jigsaw-icon {
            margin-right: 50px;
            line-height: 1;
        }
        .demo-showcase jigsaw-switch,
        .demo-showcase jigsaw-input,
        .demo-showcase jigsaw-checkbox,
        .demo-showcase jigsaw-button-bar,
        .demo-showcase jigsaw-radios-lite,
        .demo-showcase jigsaw-tile-lite {
            margin-right: 20px;
        }
    `]
})
export class BadgeBasicDemoComponent {
    public selectedLabel = {label: "中", size: "normal"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);

    public nice = "Nice";
    public dot = "dot";

    public cities = [
        {label: "北京", id: 1},
        {label: "上海-一个很长的地址", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]

    constructor(public text: BadgeTextService) {
    }
}