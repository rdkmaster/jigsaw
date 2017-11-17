import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
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
    _items: MenuData[];
    _activeItem: HTMLElement;
    _selectedItems: MenuData;
    _root: boolean;

    @Output() public select: EventEmitter<MenuData> = new EventEmitter<MenuData>();

    @Input()
    public set data(items: MenuData[]) {
        this._items = items;
    }

    @Input()
    public set root(value: boolean | string) {
        if (value === '') {
            this._root = true;
        } else {
            this._root = value as boolean;
        }
    }

    constructor() {
        super();
    }

    ngOnInit() {
    }

    public show(menu: MenuData[], callback?: MenuCallback, popupOptions?: PopupOptions) {
        this._items = menu;
    }

    _onListMouseEnter(event: Event) {
        const item = <HTMLElement>event.currentTarget;
        this._activeItem = item;
        const nextElement: HTMLElement = <HTMLElement> item.children[0].nextElementSibling;
        if (nextElement) {
            const sublist: HTMLElement = <HTMLElement> nextElement.children[0];
            sublist.style.display = 'block';
            sublist.style.top = '0px';
            sublist.style.left = (item.offsetWidth + 2) + 'px';
        }
    }

    _onListMouseLeave(event: Event) {
        this._activeItem = null;
        const item = <HTMLElement>event.currentTarget;
        const nextElement: HTMLElement = <HTMLElement> item.children[0].nextElementSibling;
        if (nextElement) {
            const sublist: HTMLElement = <HTMLElement> nextElement.children[0];
            sublist.style.display = 'none';
        }

    }

    _handleSelect(selectedItems) {
        this._selectedItems = selectedItems.map(item => item);
        this.select.emit(this._selectedItems);
    }
}
