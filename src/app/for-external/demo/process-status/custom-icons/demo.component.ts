import { Component } from "@angular/core";
import { ProcessStatusTextService } from "../doc.service";

@Component({
    selector: "process-status-custom-icons",
    templateUrl: './demo.component.html'
})
export class ProcessStatusCustomIconsComponent {
    public steps = [
        {
            title: 'done',
            status: "done",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'error',
            status: "error",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'processing',
            status: "processing",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'warning',
            status: "warning",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'skipped',
            status: "skipped",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
        {
            title: 'waiting',
            status: "waiting",
            waitingIcon: 'iconfont iconfont-e748',
            doneIcon: 'iconfont iconfont-ea37',
            processingIcon: 'iconfont iconfont-e905',
            errorIcon: 'iconfont iconfont-e192',
            warningIcon: 'iconfont iconfont-e76c',
            skippedIcon: 'iconfont iconfont-e339'
        },
    ];
    
    constructor(public doc: ProcessStatusTextService) {
    }
}
