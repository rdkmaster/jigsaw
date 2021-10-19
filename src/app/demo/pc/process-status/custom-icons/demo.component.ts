import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class ProcessStatusCustomIconsComponent {
    steps = [
        {
            title: 'done',
            status: "done",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'error',
            status: "error",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'processing',
            status: "processing",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'warning',
            status: "warning",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'skipped',
            status: "skipped",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'waiting',
            status: "waiting",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-steps组件自定义状态ICON图的方法';
    description: string = '';
}
