import {Component} from "@angular/core";
import {PopupTextService} from "../doc.service";

@Component({
    selector: 'popup-introduce',
    templateUrl: './demo.component.html'
})
export class PopupServiceIntroduceComponent {

    // // ====================================================================
    // // ignore the following lines, they are not important to this demo
    // // ====================================================================
    // summary: string = '关于`PopupService`你所需要知道的一切都在这里';
    // description: string = require('!!raw-loader!./readme.md').default;
    constructor( public text: PopupTextService) {
    }
}
