import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
})
export class ProgressFullComponent {
    progressValue='68%';

    valueChange($event) {
        this.progressValue = $event+'%';
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

