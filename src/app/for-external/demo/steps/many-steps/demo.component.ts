import { ChangeDetectorRef, Component } from "@angular/core";
import { InternalUtils } from "jigsaw/public_api";
import { StepsTextService } from "../doc.service";

@Component({
    selector: "many-steps",
    templateUrl: "./demo.component.html"
})
export class JigsawStepManyStepsDemoComponent {
    public data = [];
    public current = 0;
    public count = 30;

    private _createStepData() {
        const statuses = ["error", "warning", "normal", "normal", "normal"];
        const status = statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
        return {
            title: `这是${status}`,
            status: status,
            subTitle: '描述信息'
        };
    }

    constructor(private _cdr: ChangeDetectorRef, public doc: StepsTextService) {
        for (let i = 0; i < this.count; i++) {
            this.data.push(this._createStepData());
        }
    }
}
