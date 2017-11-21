import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styles: [`
        .fa {
            margin-right: 5px
        }
    `]
})
export class DialogInDomDemoComponent {
    public onAnswer(label) {
        if (label) {
            alert(`Button "${label}" clicked!`);
        } else {
            alert('Close bar button clicked!');
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '`jigsaw-dialog`也是一个普通的组件，可以直接用在dom中';
    description: string = '[这里](/popup/introduce)详细介绍了`PopupService`，请仔细阅读。';
}

