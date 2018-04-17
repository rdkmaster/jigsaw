import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class StepsHorizontalBasicComponent {


    steps = [
        {
            title: '第一步done',
            subtitle: 'Add a window to configure its compare paramenters',
            status: "done"
        },
        {
            title: '第二步error',
            status: "error"
        },
        {
            title: '第三步processing',
            status: "processing"
        },
        {
            title: '第四步警告',
            status: "warning"
        },
        {
            title: '第5步skipped',
            status: "skipped"
        },
        {
            title: '第六步wait',
            status: "waiting"
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
