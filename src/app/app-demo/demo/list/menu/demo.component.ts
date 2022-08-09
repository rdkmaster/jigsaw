import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {ListTextService} from "../doc.service";

@Component({
    selector: 'list-menu',
    templateUrl: './demo.component.html',
})
export class ListMenuDemoComponent {
    titles = [
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

    selectedItems: string;
    handleSelect(selectedItems) {
        this.selectedItems = selectedItems.map(item => item.title).toString()
    }
    constructor(public text: ListTextService) {
    }
}
