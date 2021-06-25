import {Component} from "@angular/core";
import {InternalUtils} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class JigsawStepContextDemoComponent {
    data = [];

    current = 0;

    constructor() {
        for (let i = 0; i < 6; i++) {
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

    // 通过指定context属性到this，才能在steps节点上，直接调用当前组件上的成员方法
    public changeStatus(idx: number) {
        this.current = idx;
    }

    public changeData() {
        let tempData = [];
        for (let i = 0; i < 6; i++) {
            tempData.push(this._createStepData(i));
        }
        this.data = tempData;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "这个demo演示steps的数据中，context属性的用法";
    description: string = "";
}
