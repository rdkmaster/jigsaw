import {Component} from "@angular/core";
import {DialogTextService} from "../doc.service";

@Component({
    selector: 'dialog-in-dom',
    templateUrl: './demo.component.html',
    styles: [`
        .iconfont {
            margin-right: 5px
        }
    `]
})
export class DialogInDomDemoComponent {
    public onAnswer(label?) {
        if (label) {
            alert(`Button "${label}" clicked!`);
        } else {
            alert('Close bar button clicked!');
        }
    }

    constructor(public doc: DialogTextService) {
    }
}
