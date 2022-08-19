import {Component} from "@angular/core";
import {InternalUtils} from "jigsaw/public_api";
import {ProcessStatusTextService} from "../doc.service";

@Component({
    selector: 'process-status-multiline',
    templateUrl: './demo.component.html',
})
export class ProcessStatusMultilineComponent {
    steps = [];

    constructor( public doc: ProcessStatusTextService) {
        for (let i = 0; i < 50; i++) {
            this.steps.push(this._createStepData(i));
        }
    }

    public changeStatus(idx: number) {
        this.steps = this.steps.concat([]);
        this.steps[idx] = this._createStepData(idx);
    }

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
}
