import {Component} from "@angular/core";
import {DialogTextService} from "../text.service";

@Component({
    selector: 'in-dom-dialog',
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

    constructor(public text: DialogTextService) {
    }
}
