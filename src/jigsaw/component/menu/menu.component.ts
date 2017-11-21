import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

import {AbstractJigsawComponent} from "../common";
import {PopupOptions} from "../../service/popup.service";
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
    @ViewChild('menuContainer')menuContainer: HTMLElement;
    _items: MenuData[];
    _selectedItems: MenuData;

    @Output() public select: EventEmitter<MenuData> = new EventEmitter<MenuData>();

    @Input()
    public set data(items: MenuData[]) {
        this._items = items;
    }

    constructor() {
        super();
    }

    ngOnInit() {
    }

    public show(menu: MenuData[], callback?: MenuCallback, popupOptions?: PopupOptions) {
        this._items = menu;
    }

    _handleSelect(selectedItems) {
        this._selectedItems = selectedItems.map(item => item);
        this.select.emit(this._selectedItems);
    }
}
