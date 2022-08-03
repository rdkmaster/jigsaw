import {Component} from "@angular/core";
import {DragDropTextService} from "./doc.service";

@Component({
    templateUrl: 'demo.component.html',
})
export class DragDropDemoComponent {
    constructor( public text: DragDropTextService) {
    }
}
