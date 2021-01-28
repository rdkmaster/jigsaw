import {Component} from "@angular/core";

@Component({
    templateUrl:'./demo.component.html'
})
export class StepsCustomIconsComponent {
    steps = [
        {
            title: 'done',
            status: "done",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon:'iconfont iconfont-e198',
            processingIcon:'iconfont iconfont-e234',
            errorIcon:'iconfont iconfont-e8e3',
            warningIcon:'iconfont iconfont-e437',
            skippedIcon:'iconfont iconfont-e3ad'
        },
        {
            title: 'error',
            status: "error",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon:'iconfont iconfont-e198',
            processingIcon:'iconfont iconfont-e234',
            errorIcon:'iconfont iconfont-e8e3',
            warningIcon:'iconfont iconfont-e437',
            skippedIcon:'iconfont iconfont-e3ad'
        },
        {
            title: 'processing',
            status: "processing",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon:'iconfont iconfont-e198',
            processingIcon:'iconfont iconfont-e234',
            errorIcon:'iconfont iconfont-e8e3',
            warningIcon:'iconfont iconfont-e437',
            skippedIcon:'iconfont iconfont-e3ad'
        },
        {
            title: 'warning',
            status: "warning",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon:'iconfont iconfont-e198',
            processingIcon:'iconfont iconfont-e234',
            errorIcon:'iconfont iconfont-e8e3',
            warningIcon:'iconfont iconfont-e437',
            skippedIcon:'iconfont iconfont-e3ad'
        },
        {
            title: 'skipped',
            status: "skipped",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon:'iconfont iconfont-e198',
            processingIcon:'iconfont iconfont-e234',
            errorIcon:'iconfont iconfont-e8e3',
            warningIcon:'iconfont iconfont-e437',
            skippedIcon:'iconfont iconfont-e3ad'
        },
        {
            title: 'waiting',
            status: "waiting",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon:'iconfont iconfont-e198',
            processingIcon:'iconfont iconfont-e234',
            errorIcon:'iconfont iconfont-e8e3',
            warningIcon:'iconfont iconfont-e437',
            skippedIcon:'iconfont iconfont-e3ad'
        },
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-steps组件自定义状态ICON图的方法，注意支持Jigsaw自研的iconfont图标';
    description: string = '';
}
