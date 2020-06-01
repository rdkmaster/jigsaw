import {Component, ViewChild} from "@angular/core";
import {EstimateInfo, JigsawProgress} from "jigsaw/pc-components/progress/progress";

@Component({
    templateUrl: './demo.component.html',
})
export class ProgressFullComponent {
    progressValue='68%';

    valueChange($event) {
        this.progressValue = $event+'%';
    }

    @ViewChild('estimateProgress', {static: false}) estimateProgress: JigsawProgress;

    refreshProgress() {
        this.estimateProgress.estimateProgress(new EstimateInfo());
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

