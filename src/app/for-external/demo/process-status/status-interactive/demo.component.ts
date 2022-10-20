import {ChangeDetectorRef, Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'process-status-interactive',
    templateUrl: './demo.component.html',
})
export class ProcessStatusInteractiveComponent extends AsyncDescription {
    public demoPath = "demo/process-status/status-interactive";

    public steps = [
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

    public skipStep(index) {
        this.steps[index].status = "skipped";
        this._changeDetector.detectChanges();
    }

    constructor(private _changeDetector: ChangeDetectorRef, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
