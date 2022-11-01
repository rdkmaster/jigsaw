import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'list-menu',
    templateUrl: './demo.component.html',
})
export class ListMenuDemoComponent extends AsyncDescription {
    public demoPath = "demo/list/menu";

    public titles = [
        {
            title: 'Settings',
            subTitle: 'Ctrl+Alt+A',
            subMenu: false
        },
        {
            title: 'Print',
            subTitle: '',
            subMenu: true
        },
        {
            title: 'Save All',
            subTitle: 'Ctrl+S',
            subMenu: false
        },
        {
            title: 'Exit',
            subTitle: '',
            subMenu: true
        }
    ];
}
