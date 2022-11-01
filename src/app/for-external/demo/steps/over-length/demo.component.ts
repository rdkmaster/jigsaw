import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { InternalUtils } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'steps-over-length',
    templateUrl: "./demo.component.html"
})
export class JigsawStepOverLengthDemoComponent extends AsyncDescription {
    public demoPath = "demo/steps/over-length";

    public data = [
        {
            title: "这是非常长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的title",
            status: "normal",
            subTitle: `
                <span title="可以通过这个方式来添加tooltip">
                    这是非常长长长长长长长长长长长长长长长长长长长长长的subtitle
                </span>
            `
        },
        {
            title: "这是非常长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的title",
            status: "normal",
            subTitle: `
                <span title="可以通过这个方式来添加tooltip">
                    这是非常长长长长长长长长长长长长长长长长长长长长长的subtitle
                </span>
            `
        }
    ];

    public current = 0;

    private _createStepData() {
        const statuses = ["error", "warning", "normal", "normal", "normal"];
        const status =
            statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
        return {
            title: `这是${status}`,
            status: status,
            subTitle: '描述信息'
        };
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        for (let i = 2; i < 5; i++) {
            this.data.push(this._createStepData());
        }
    }
}
