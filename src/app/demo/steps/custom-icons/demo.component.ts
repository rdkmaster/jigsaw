import {Component} from "@angular/core";

@Component({
    templateUrl:'./demo.component.html'
})
export class StepsCustomIconsComponent {
    steps = [
        {
            title: 'done',
            status: "done",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-spin fa-2x fa-fw',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
        {
            title: 'error',
            status: "error",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-spin fa-2x fa-fw',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
        {
            title: 'processing',
            status: "processing",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-spin  fa-fw',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
        {
            title: 'warning',
            status: "warning",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-spin fa-2x fa-fw',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
        {
            title: 'skipped',
            status: "skipped",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-spin fa-2x fa-fw',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
        {
            title: 'waiting',
            status: "waiting",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-spin  fa-fw',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-steps组件自定义状态ICON图的方法，注意仅支持font-awesome和Jigsaw自研的iconfont图标';
    description: string = '';
}
