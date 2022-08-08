import {Component} from "@angular/core";
import {IconTextService} from "../doc.service";

@Component({
    selector: 'icon-position',
    templateUrl: './demo.component.html'
})
export class IconPositionDemoComponent {

    public onClick() {
        alert('你戳到我啦');
    }

    constructor(public text: IconTextService) {
    }
}
