import {ChangeDetectorRef, Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
})
export class StepsClickChangeStatusComponent {
    constructor(private _changeDetector: ChangeDetectorRef) {
    }
    steps = [
        {
            title: 'starting',
            status: "starting",
        },
        {
            title: 'done',
            status: "done",
        },
        {
            title: 'error',
            status: "error",

        },
        {
            title: 'processing',
            status: "processing",
        },
        {
            title: 'warning',
            status: "warning",
        },
        {
            title: 'skipped',
            status: "skipped",
        },
        {
            title: 'waiting',
            status: "waiting",
        },
        {
            title: 'running',
            status: "running",
        },
        {
            title: 'ending',
            status: "ending",
        }
    ];

    skipStep(index){
        this.steps[index].status = "skipped";
        this._changeDetector.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了如何配合trustedHtml对用户提供交互的例子';
    description: string = '';

}
