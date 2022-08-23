import { ChangeDetectorRef, Component } from "@angular/core";
import { ProcessStatusTextService } from "../doc.service";

@Component({
    selector: 'process-status-interactive',
    templateUrl: './demo.component.html',
})
export class ProcessStatusInteractiveComponent {
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

    constructor(private _changeDetector: ChangeDetectorRef, public doc: ProcessStatusTextService) {
    }
}
