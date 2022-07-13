import {Component, QueryList, ViewChildren} from "@angular/core";
import {ProgressTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";
import {PopupInfo} from "../../../../../jigsaw/common/service/popup.service";
import {JigsawProgress} from "../../../../../jigsaw/pc-components/progress/progress";
import {JigsawCircleProgress} from "../../../../../jigsaw/pc-components/progress/circle-progress";

@Component({
    selector: 'top-progress',
    templateUrl: "./demo.component.html"
})
export class TopProgressDemoComponent {
    @ViewChildren(JigsawProgress)
    progresses1: QueryList<JigsawProgress>;
    @ViewChildren(JigsawCircleProgress)
    progresses2: QueryList<JigsawCircleProgress>;

    get progresses(): (JigsawCircleProgress | JigsawProgress)[] {
        return [...this.progresses1.toArray(), ...this.progresses2.toArray()];
    }
    progressValue: number = 32;
    dockingBar: PopupInfo;
    duration: number = 10000;
    maxProgress: number = 80;
    estimationInfo: string = '';

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

    startEstimation() {
        this.estimationInfo = '';
        this.progresses.forEach(progress => {
            progress.value = this.progressValue;
            progress.startEstimating(this.duration, this.maxProgress);
            progress.status = 'processing';
        });
    }

    constructor(public text: ProgressTextService) {
    }
}
