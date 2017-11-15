import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

import {AbstractJigsawComponent} from "../common";
import {PopupOptions, PopupService} from "../../service/popup.service";
import {MenuData, MenuCallback} from "./menu.typings";

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
    _titles: MenuData[];
    _selectedItems1: any;

    @Output() public select: EventEmitter<MenuData> = new EventEmitter<MenuData>();

    @Input()
    set data (data: MenuData[]){
        this._titles = data;
    }

    constructor(public popupService: PopupService) {
        super();
    }

    ngOnInit() {
        this._width = this.width;
        this._height = this.height;
    }

    public show(menu: MenuData[], callback?: MenuCallback, popupOptions?: PopupOptions) {
        this._titles = menu;
    }

    _handleSelect(selectedItems) {
        console.log(selectedItems);
        this._selectedItems1 = selectedItems.map(item => item.label).toString();
    }
}
