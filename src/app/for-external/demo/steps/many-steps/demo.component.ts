import {ChangeDetectorRef, Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { InternalUtils } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "many-steps",
    templateUrl: "./demo.component.html"
})
export class JigsawStepManyStepsDemoComponent extends AsyncDescription {
    public demoPath = "demo/steps/many-steps";

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

    constructor(private _cdr: ChangeDetectorRef, http: HttpClient, el: ElementRef) {
        super(http, el);
        for (let i = 0; i < this.count; i++) {
            this.data.push(this._createStepData());
        }
    }
}
