import {Component} from "@angular/core";
import {DrawerTextService} from "../text.service";

@Component({
    selector: 'with-div-drawer',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithDivDemoComponent {
    width: string = 'auto';
    height: string = 'calc(100% - 30px)';

    selectedPosition = 'left';

    offsetLeft: string;
    offsetTop: string = '28';
    offsetRight: string;
    offsetBottom: string;

    constructor(public text: DrawerTextService) {
    }
}
