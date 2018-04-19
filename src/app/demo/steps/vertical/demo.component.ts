import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
})
export class StepsVerticalFullComponent {

    steps = [
        {
            title: 'done',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "done",
        },
        {
            title: 'error',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "error",
        },
        {
            title: 'processing',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "processing",
        },
        {
            title: 'warning',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "warning",
        },
        {
            title: 'skipped',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "skipped",
        },
        {
            title: 'waiting',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "waiting",
        },
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-steps垂直排列的效果';
    description: string = '';
}
