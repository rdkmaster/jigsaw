import {ChangeDetectorRef, Component, ViewChild} from "@angular/core";
import {InternalUtils} from "jigsaw/public_api";
import {StepsTextService} from "../doc.service";
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@Component({
    selector: "many-steps",
    templateUrl: "./demo.component.html"
})
export class JigsawStepManyStepsDemoComponent {
    data = [];
    current = 0;
    count = 30;

    @ViewChild('hScrollbar', {read: PerfectScrollbarDirective})
    private _hScrollbar: PerfectScrollbarDirective;

    constructor(private _cdr: ChangeDetectorRef, public text: StepsTextService) {
        for (let i = 0; i < this.count; i++) {
            this.data.push(this._createStepData());
        }
    }

    private _createStepData() {
        const statuses = ["error", "warning", "normal", "normal", "normal"];
        const status = statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
        return {
            title: `这是${status}`,
            status: status,
            subTitle: '描述信息'
        };
    }
}
