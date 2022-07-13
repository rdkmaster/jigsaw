import {Component, QueryList, ViewChildren} from "@angular/core";
import {ProgressTextService} from "../text.service";
import {JigsawProgress} from "../../../../../jigsaw/pc-components/progress/progress";
import {JigsawCircleProgress} from "../../../../../jigsaw/pc-components/progress/circle-progress";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'estimation-progress',
    templateUrl: './demo.component.html',
})
export class ProgressEstimationComponent {
    @ViewChildren(JigsawProgress)
    progresses1: QueryList<JigsawProgress>;
    @ViewChildren(JigsawCircleProgress)
    progresses2: QueryList<JigsawCircleProgress>;

    get progresses(): (JigsawCircleProgress | JigsawProgress)[] {
        return [...this.progresses1.toArray(), ...this.progresses2.toArray()];
    }
    progressValue: number = 32;
    estimationInfo: string = '';
    duration: number = 10000;
    maxProgress: number = 80;

    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "default"},
    ]);
    public selectedLabel = {label: "大", size: "default"};

    startEstimation() {
        this.estimationInfo = '';
        this.progresses.forEach(progress => {
            progress.value = this.progressValue;
            progress.startEstimating(this.duration, this.maxProgress);
            progress.status = 'processing';
        });
    }

    onEstimationStopped(value: number) {
        this.estimationInfo = '进度估计终止在' + value + '%';
        if (value >= this.maxProgress) {
            this.progresses.forEach(progress => progress.status = 'block');
        }
    }

    reset() {
        location.reload();
    }

    constructor(public text: ProgressTextService) {
    }

}
