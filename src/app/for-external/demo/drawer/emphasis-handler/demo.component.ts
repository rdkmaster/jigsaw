import {Component} from "@angular/core";
import {DrawerTextService} from "../doc.service";

@Component({
    selector: 'drawer-emphasis-handler',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerEmphasisHandlerDemoComponent {
    height: string = 'calc(100% - 30px)';

    offsetLeft: string;
    offsetTop: string = '28';
    offsetRight: string;
    offsetBottom: string;

    constructor(public text: DrawerTextService) {
    }
}
