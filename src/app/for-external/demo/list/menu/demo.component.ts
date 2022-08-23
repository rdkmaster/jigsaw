import { Component } from "@angular/core";
import { ListTextService } from "../doc.service";

@Component({
    selector: 'list-menu',
    templateUrl: './demo.component.html',
})
export class ListMenuDemoComponent {
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

    constructor(public doc: ListTextService) {
    }
}
