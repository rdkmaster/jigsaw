import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class AlertInDomDemoComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawInfoAlert', 'JigsawWarningAlert', 'JigsawErrorAlert', 'JigsawConfirmAlert'
    ];
}

