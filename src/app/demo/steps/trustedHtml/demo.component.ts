import { Component, ChangeDetectorRef } from "@angular/core";
import { ArrayCollection } from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class StepsHorizontalTrustedHTMLComponent {
    constructor(private _changeDetector: ChangeDetectorRef) {

    }



    steps = [
        {
            title: '第一步done',
            status: "done",


        },
        {
            title: '第二步error',

            status: "error",

        },
        {
            title: '第三步',

            status: "processing",

        },
        {
            title: '第四步警告',

            status: "warning",

        },
        {
            title: '第5步skipped',
            status: "skipped",

        },
        {
            title: '第六步wait',
            status: "waiting",
        },
    ];

    skipStep(index){
        this.steps[index].status = "skipped";
        this._changeDetector.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawSteps'
    ];
}
