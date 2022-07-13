import {Component} from "@angular/core";
import {InternalUtils} from "jigsaw/public_api";
import {StepsTextService} from "../text.service";

@Component({
    selector: 'over-length-steps',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawStepOverLengthDemoComponent {
    data = [
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

    current = 0;

    constructor(public text: StepsTextService) {
        for (let i = 2; i < 5; i++) {
            this.data.push(this._createStepData());
        }
    }

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
}
