import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

import {AbstractJigsawComponent} from "../common";
import {MenuData} from "./menu.typings";

@Component({
    selector: 'jigsaw-menu-sub, j-menu-sub',
    templateUrl: './menu-sub.component.html',
    styleUrls: ['./menu-sub.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JigsawMenuSubComponent),
            multi: true
        }
    ],
})

export class JigsawMenuSubComponent extends AbstractJigsawComponent implements OnInit {
    _root: boolean;
    _items: MenuData[];
    _activeItem: HTMLElement;
    _selectedItems: MenuData;

    @Output() public selectedItem: EventEmitter<MenuData> = new EventEmitter<MenuData>();

    @Input()
    public set items(items: MenuData[]) {
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

    _handleSelect(selectedItems) {
        this._selectedItems = selectedItems.map(item => item);
        this.selectedItem.emit(this._selectedItems);
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
}



