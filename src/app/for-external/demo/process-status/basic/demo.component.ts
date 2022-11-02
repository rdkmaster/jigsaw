import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'process-status-basic',
    templateUrl: './demo.component.html',
})
export class ProcessStatusBasicComponent extends AsyncDescription {
    public demoPath = "demo/process-status/basic";

    public steps = [
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
}
