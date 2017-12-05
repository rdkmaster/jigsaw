import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styles: [`
        .tooltip-content {
            line-height: 1;
            font-size: 12px
        }

        .tooltip-content h3 {
            margin-bottom: 8px;
            font-size: 14px;
        }

        .tooltip-content h3 span {
            margin-right: 5px
        }

        .tooltip-content p {
            line-height: 1.4;
        }
    `]
})
export class TooltipInDomDemoComponent {

    show() {
        alert('I got it!')
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

