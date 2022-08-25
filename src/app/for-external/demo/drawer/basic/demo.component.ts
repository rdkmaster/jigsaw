import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'drawer-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/drawer/basic";

    public isOpen: boolean = false;
    public touched = false;
    public width: string = '20%';
    public height: string = '100%';

    public toggle() {
        this.isOpen = !this.isOpen;
        this.touched = true;
    }
}
