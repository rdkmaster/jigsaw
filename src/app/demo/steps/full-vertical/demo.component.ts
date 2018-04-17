import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class StepsVerticalFullComponent {




    steps = [
        {
            title: '第一步done',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "done",


        },
        {
            title: '第二步error',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "error",

        },
        {
            title: '第三步',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "processing",

        },
        {
            title: '第四步警告',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "warning",

        },
        {
            title: '第5步skipped',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "skipped",

        },
        {
            title: '第六步wait',
            subTitle: 'Add a window to configure its compare paramenters',
            status: "waiting",

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
