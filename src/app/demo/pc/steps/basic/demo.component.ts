import {Component} from "@angular/core";
import {InternalUtils} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawStepBasicDemoComponent {
    data = [];

    current = 0;

    constructor() {
        for (let i = 0; i < 6; i++) {
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

    public changeData() {
        let tempData = [];
        for (let i = 0; i < 6; i++) {
            tempData.push(this._createStepData());
        }
        this.data = tempData;
    }

    public currentChange(event: number) {
        console.log(`${event} is selected: `, this.data[event]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
