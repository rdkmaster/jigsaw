import {Component} from "@angular/core";
import {DrawerTextService} from "../text.service";

@Component({
    selector: 'with-scrollbar',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithScrollbarDemoComponent {
    constructor(public text: DrawerTextService) {
    }
}
