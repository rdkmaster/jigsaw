import {Component, ViewChild} from "@angular/core";
import {JigsawProgress} from "jigsaw/pc-components/progress/progress";

@Component({
    templateUrl: './demo.component.html',
})
export class ProgressFullComponent {
    @ViewChild('estimateProgress', {static: false})
    estimateProgress: JigsawProgress;
    progressValue: number = 32;
    estimationInfo: string = '';
    duration: number = 10000;
    maxProgress: number = 80;

    refreshProgress() {
        this.estimateProgress.value = this.progressValue;
        this.estimateProgress.startEstimating(this.duration, this.maxProgress);
        this.estimationInfo = '';
        this.estimateProgress.status = 'processing';
    }

    onEstimationStopped(value: number) {
        this.estimationInfo = '进度估计终止在' + value + '%';
        if (value >= this.maxProgress) {
            this.estimateProgress.status = 'block';
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

