import {Component, forwardRef, OnInit, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

import {AbstractJigsawComponent} from "../common";
import {PopupService} from "../../service/popup.service";

@Component({
    selector: 'jigsaw-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JigsawMenuComponent),
            multi: true
        }
    ],
})
export class JigsawMenuComponent extends AbstractJigsawComponent implements OnInit {
    _titles = [
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
    _selectedItems1: string;

    constructor(public popupService:PopupService) {
        super();
    }

    ngOnInit() {
    }

    _handleSelect(selectedItems) {
        this._selectedItems1 = selectedItems.map(item => item.title).toString()
    }
}
