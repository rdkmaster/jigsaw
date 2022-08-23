import { Component } from "@angular/core";
import { DrawerTextService } from "../doc.service";

@Component({
    selector: 'drawer-emphasis-handler',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerEmphasisHandlerDemoComponent {
    public height: string = 'calc(100% - 30px)';

    public offsetLeft: string;
    public offsetTop: string = '28';
    public offsetRight: string;
    public offsetBottom: string;

    constructor(public doc: DrawerTextService) {
    }
}
