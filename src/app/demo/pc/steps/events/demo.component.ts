import {Component, ViewChild} from "@angular/core";
import {InternalUtils, JigsawSteps, StepTitleInfo} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawStepEventsDemoComponent {
    public data = [];
    public deleteIndex = 0;
    public index = 1;

    @ViewChild('jigsawSteps')
    private _jigsawSteps: JigsawSteps;

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
            title: `节点-${this.index++}`,
            status: status
        };
    }

    delete() {
        this._jigsawSteps.removeStep(this.deleteIndex);
    }

    add() {
        this._jigsawSteps.addStep(`新节点-${this.index++}`);
    }

    rename() {
        this._jigsawSteps.renameStep(`新节点-${this.index++}`, 0);
    }

    removeHandler(index: number) {
        console.log(`第 ${index + 1} 个节点被删除了`);
    }

    addHandler(step: JigsawSteps) {
        console.log(`添加节点事件：`, step);
    }

    titleChangeHandler(step: StepTitleInfo) {
        console.log(`节点被修改为：`, step);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
