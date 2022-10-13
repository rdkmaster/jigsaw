import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { InternalUtils } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'process-status-multiline',
    templateUrl: './demo.component.html',
})
export class ProcessStatusMultilineComponent extends AsyncDescription {
    public demoPath = "demo/process-status/status-multiline";

    public steps = [];

    private _createStepData(index: number) {
        const statuses = ["done", "error", "processing", "warning", "skipped", "waiting"];
        const status = statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
        return {
            title: `This is a ${status} node`,
            status: status,
            subTitle: `#${index + 1} - <a (click)="changeStatus(${index})">click here</a> to change a random status.`,
            context: this
        };
    }

    public numInLine = 5;

    public presize = 'default';

    public _$handleAdd() {
        this.numInLine++;
    }

    public _$handleSub() {
        if (this.numInLine > 1) {
            this.numInLine--;
        }
    }

    public _$handleLarge() {
        this.presize = 'large';
    }

    public _$handleSmall() {
        this.presize = 'small';
    }


    public _$handleDefault() {
        this.presize = 'default';
    }

    public _$selectChange($event) {
        console.log($event);
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        for (let i = 0; i < 50; i++) {
            this.steps.push(this._createStepData(i));
        }
    }
}
