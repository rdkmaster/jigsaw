import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'drawer-with-div',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithDivDemoComponent extends AsyncDescription {
    public demoPath = "demo/drawer/with-div";

    public height: string = 'calc(100% - 30px)';

    public offsetLeft: string;
    public offsetTop: string = '28';
    public offsetRight: string;
    public offsetBottom: string;
}
