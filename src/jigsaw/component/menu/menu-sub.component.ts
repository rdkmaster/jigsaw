import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

import {AbstractJigsawComponent} from "../common";
import {PopupService} from "../../service/popup.service";
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
    _prefixCls = 'jigsaw';
    _innerPrefixCls = `${this._prefixCls}-menu`;
    static zIndex = 1000;
    _root = false;
    _item: MenuData[];
    _activeItem: HTMLElement;
    _selectedItems1: string;

    @Output() public selectedItem: EventEmitter<MenuData> = new EventEmitter<MenuData>();

    @Input()
    public set item(item: MenuData[]) {
        this._item = item;
    }

    @Input()
    public set root(value: boolean | string) {
        if (value === '') {
            this._root = true;
        } else {
            this._root = value as boolean;
        }
    }

    constructor(public popupService: PopupService) {
        super();
    }

    ngOnInit() {

    }

    _handleSelect(selectedItems) {
        this.selectedItem.emit(selectedItems);
        this._selectedItems1 = selectedItems.map(item => item.label).toString();
    }

    _onListMouseEnter(event: Event, menuItem: MenuData[]) {
        const item = <HTMLElement>event.currentTarget;
        this._activeItem = item;
        const nextElement: HTMLElement = <HTMLElement> item.children[0].nextElementSibling;
        if (nextElement) {
            const sublist: HTMLElement = <HTMLElement> nextElement.children[0];
            sublist.style.display = 'block';
            sublist.style.zIndex = String(++ JigsawMenuSubComponent.zIndex);
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
            setTimeout(() => {
                sublist.style.display = 'none';
            }, 150);
        }

    }

}


