import { Component } from "@angular/core";
import { InternalUtils } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class JigsawStepOverLengthDemoComponent {
    data = [
        {
            title: "这是非常长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的title",
            status: "normal",
            subTitle: `
                <span title="可以通过这个方式来添加tooltip">
                    <a (click)="changeStatus(0)">跳至此处</a>
                    这是非常长长长长长长长长长长长长长长长长长长长长长的subtitle
                </span>
            `,
            context: this
        },
        {
            title: "这是非常长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的title",
            status: "normal",
            subTitle: `
                <span title="可以通过这个方式来添加tooltip">
                    <a (click)="changeStatus(1)">跳至此处</a>
                    这是非常长长长长长长长长长长长长长长长长长长长长长的subtitle
                </span>
            `,
            context: this
        }
    ];

    current = 0;

    constructor() {
        for (let i = 2; i < 5; i++) {
            this.data.push(this._createStepData(i));
        }
    }

    private _createStepData(index: number) {
        const statuses = ["error", "warning", "normal", "normal", "normal"];
        const status =
            statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
        return {
            title: `这是${status}`,
            status: status,
            subTitle: `<a (click)="changeStatus(${index})">跳至此处</a>`,
            context: this
        };
    }

    public changeStatus(idx: number) {
        this.current = idx;
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
