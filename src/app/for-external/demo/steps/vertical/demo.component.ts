import {Component} from "@angular/core";
import {InternalUtils} from "jigsaw/public_api";
import {StepsTextService} from "../doc.service";

@Component({
    selector: 'steps-vertical',
    templateUrl: "./demo.component.html"
})
export class JigsawStepVerticalDemoComponent {
    data = [];

    current = 0;

    constructor(public doc: StepsTextService) {
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

    public currentChange(event: number) {
        console.log(`${event} is selected: `, this.data[event]);
    }
}
