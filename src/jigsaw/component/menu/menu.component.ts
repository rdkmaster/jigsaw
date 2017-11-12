import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

import {AbstractJigsawComponent} from "../common";
import {PopupService} from "../../service/popup.service";
import {MenuData} from "./menu.typings";

@Component({
    selector: 'jigsaw-menu, j-menu',
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
    _width = '150';
    _height = 'auto';
    _selectedItems1: string;

    @Input() data: MenuData[];

    constructor(public popupService: PopupService) {
        super();
    }

    ngOnInit() {
        this._width = this.width;
        this._height = this.height;
    }

    _handleSelect(selectedItems) {
        this._selectedItems1 = selectedItems.map(item => item.title).toString()
    }

    setSubMenu() {

    }
}
