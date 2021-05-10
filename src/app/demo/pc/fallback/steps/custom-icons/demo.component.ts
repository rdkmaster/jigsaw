import {Component} from "@angular/core";

@Component({
    templateUrl:'./demo.component.html'
})
export class StepsCustomIconsComponent {
    steps = [
        {
            title: 'done',
            status: "done",
            waitingIcon: 'iconfont-e29c',
            doneIcon:'iconfont-e29d',
            processingIcon:'iconfont-e297',
            errorIcon:'iconfont-e298',
            warningIcon:'iconfont-e299',
            skippedIcon:'iconfont-e29a'
        },
        {
            title: 'error',
            status: "error",
            waitingIcon: 'iconfont-e29c',
            doneIcon:'iconfont-e29d',
            processingIcon:'iconfont-e297',
            errorIcon:'iconfont-e298',
            warningIcon:'iconfont-e299',
            skippedIcon:'iconfont-e29a'
        },
        {
            title: 'processing',
            status: "processing",
            waitingIcon: 'iconfont-e29c',
            doneIcon:'iconfont-e29d',
            processingIcon:'iconfont-e297',
            errorIcon:'iconfont-e298',
            warningIcon:'iconfont-e299',
            skippedIcon:'iconfont-e29a'
        },
        {
            title: 'warning',
            status: "warning",
            waitingIcon: 'iconfont-e29c',
            doneIcon:'iconfont-e29d',
            processingIcon:'iconfont-e297',
            errorIcon:'iconfont-e298',
            warningIcon:'iconfont-e299',
            skippedIcon:'iconfont-e29a'
        },
        {
            title: 'skipped',
            status: "skipped",
            waitingIcon: 'iconfont-e29c',
            doneIcon:'iconfont-e29d',
            processingIcon:'iconfont-e297',
            errorIcon:'iconfont-e298',
            warningIcon:'iconfont-e299',
            skippedIcon:'iconfont-e29a'
        },
        {
            title: 'waiting',
            status: "waiting",
            waitingIcon: 'iconfont-e29c',
            doneIcon:'iconfont-e29d',
            processingIcon:'iconfont-e297',
            errorIcon:'iconfont-e298',
            warningIcon:'iconfont-e299',
            skippedIcon:'iconfont-e29a'
        },
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-steps组件自定义状态ICON图的方法，注意仅支持font-awesome和Jigsaw自研的iconfont图标';
    description: string = '';
}
