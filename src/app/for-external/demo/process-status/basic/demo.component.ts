import {Component} from "@angular/core";
import {ProcessStatusTextService} from "../doc.service";

@Component({
    selector: 'process-status-basic',
    templateUrl: './demo.component.html',
})
export class ProcessStatusBasicComponent {
    steps = [
        {
            title: 'done',
            status: "done"
        },
        {
            title: 'error',
            status: "error"
        },
        {
            title: 'processing',
            status: "processing"
        },
        {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        },
    ];
    constructor( public doc: ProcessStatusTextService) {
    }
}
