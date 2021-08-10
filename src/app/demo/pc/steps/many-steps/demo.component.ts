import {ChangeDetectorRef, Component, ViewChild} from "@angular/core";
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {InternalUtils} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawStepManyStepsDemoComponent {
    data = [];
    current = 0;
    count = 30;

    @ViewChild('hScrollbar', {read: PerfectScrollbarDirective})
    private _hScrollbar: PerfectScrollbarDirective;

    @ViewChild('vScrollbar', {read: PerfectScrollbarDirective})
    private _vScrollbar: PerfectScrollbarDirective;

    constructor(private _cdr: ChangeDetectorRef) {
        for (let i = 0; i < this.count; i++) {
            this.data.push(this._createStepData());
        }
    }

    public changeData() {
        const tempData = [];
        for (let i = 0; i < this.count; i++) {
            tempData.push(this._createStepData());
        }
        this.data = tempData;
        this.current = this.current >= this.data.length ? 0 : this.current;

        this._hScrollbar.scrollToLeft();
        this._hScrollbar.update();
        this._vScrollbar.scrollToTop();
        this._vScrollbar.update();
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
