import {Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {JigsawCircleProgress, JigsawProgress, PopupInfo} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class ProgressFullComponent {
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
    dockingBar: PopupInfo;

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

    showTopBar() {
        if (this.dockingBar) {
            this.dockingBar.dispose();
        }
        this.dockingBar = JigsawProgress.showDockingBar(this.progressValue);
    }

    updateTopBarValue(offset) {
        if (!this.dockingBar) {
            return;
        }
        this.dockingBar.instance.status = 'processing';
        this.dockingBar.instance.value += offset;
    }

    reset() {
        location.reload();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本Demo集中展示了进度条的各种功能，请仔细浏览、尝试各个功能';
    description: string = '';
}
