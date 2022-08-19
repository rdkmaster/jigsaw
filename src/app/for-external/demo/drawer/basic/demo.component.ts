import {Component} from "@angular/core";
import {DrawerTextService} from "../doc.service";

@Component({
    selector: 'drawer-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerBasicDemoComponent {
    isOpen: boolean = false;
    touched = false;
    width: string = '20%';
    height: string = '100%';

    toggle() {
        this.isOpen = !this.isOpen;
        this.touched = true;
    }

    constructor(public doc: DrawerTextService) {
    }
}
