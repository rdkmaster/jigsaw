import {Component} from "@angular/core";
import {PopupTextService} from "../doc.service";

@Component({
    selector: 'popup-introduce',
    templateUrl: './demo.component.html'
})
export class PopupServiceIntroduceComponent {
    constructor( public text: PopupTextService) {
    }
}
