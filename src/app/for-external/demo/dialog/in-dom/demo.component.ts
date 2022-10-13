import { Component } from "@angular/core";
import { AsyncDescription } from 'app/for-external/demo-template/demo-template';

@Component({
    selector: 'dialog-in-dom',
    templateUrl: './demo.component.html'
})
export class DialogInDomDemoComponent extends AsyncDescription {
    public demoPath = "demo/dialog/in-dom";

    public onAnswer(label?) {
        if (label) {
            alert(`Button "${label}" clicked!`);
        } else {
            alert('Close bar button clicked!');
        }
    }
}
