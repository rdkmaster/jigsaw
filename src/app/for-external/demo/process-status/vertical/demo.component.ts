import {Component} from "@angular/core";
import {ProcessStatusTextService} from "../doc.service";

@Component({
    selector: 'process-status-vertical',
    templateUrl: './demo.component.html',
})
export class ProcessStatusVerticalFullComponent {
    constructor(public text: ProcessStatusTextService) {
    }
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

}
