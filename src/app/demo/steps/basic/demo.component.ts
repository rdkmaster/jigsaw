import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class StepsHorizontalBasicComponent {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
