import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class StepsHorizontalFullComponent {




    steps2 = [
        {
            title: '第一步done',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "done",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-hourglass1 fa-hourglass2 fa-hourglass3 fa-hourglass-end',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'

        },
        {
            title: '第二步error',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "error",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-hourglass1 fa-hourglass2 fa-hourglass3 fa-hourglass-end',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
        {
            title: '第三步',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "processing",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-hourglass1 fa-hourglass2 fa-hourglass3 fa-hourglass-end',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square',
            lable:"单击<a (click)='skipStep({{index}})'>这里</a>跳过此步骤"
        },
        {
            title: '第四步警告',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "warning",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-hourglass1 fa-hourglass2 fa-hourglass3 fa-hourglass-end',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
        {
            title: '第5步skipped',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "skipped",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-hourglass1 fa-hourglass2 fa-hourglass3 fa-hourglass-end',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
        {
            title: '第六步wait',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "waiting",
            waitingIcon: 'fa-hand-stop-o',
            doneIcon:'fa-hand-peace-o',
            processingIcon:'fa-hourglass fa-hourglass1 fa-hourglass2 fa-hourglass3 fa-hourglass-end',
            errorIcon:'fa-window-close-o',
            warningIcon:'fa-exclamation-circle',
            skippedIcon:'fa-share-square'
        },
    ];

  

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawSteps'
    ];
}
