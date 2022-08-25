import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { InternalUtils } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'steps-vertical',
    templateUrl: "./demo.component.html"
})
export class JigsawStepVerticalDemoComponent extends AsyncDescription {
    public demoPath = "demo/steps/vertical";

    public data = [];

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

    public currentChange(event: number) {
        console.log(`${event} is selected: `, this.data[event]);
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        for (let i = 0; i < 6; i++) {
            this.data.push(this._createStepData());
        }
    }
}
