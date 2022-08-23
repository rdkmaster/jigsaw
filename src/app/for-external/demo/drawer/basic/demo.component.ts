import { Component } from "@angular/core";
import { DrawerTextService } from "../doc.service";

@Component({
    selector: 'drawer-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerBasicDemoComponent {
    public isOpen: boolean = false;
    public touched = false;
    public width: string = '20%';
    public height: string = '100%';

    public toggle() {
        this.isOpen = !this.isOpen;
        this.touched = true;
    }

    constructor(public doc: DrawerTextService) {
    }
}
