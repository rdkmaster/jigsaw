import {Component} from "@angular/core";
import {IconTextService} from "../doc.service";

@Component({
    selector: 'icon-basic',
    templateUrl: './demo.component.html'
})
export class IconBasicDemoComponent {

    public onClick() {
        alert('你戳到我啦');
    }

    constructor(public doc: IconTextService) {
    }
}
