import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
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
    _root = false;
    _item: MenuData[];
    activeItem: HTMLLIElement;

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

    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuData[]) {
        if (menuitem.disabled) {
            return;
        }

        this.activeItem = item;
        let nextElement: HTMLElement = <HTMLElement> item.children[0].nextElementSibling;
        if (nextElement) {
            let sublist: HTMLElement = <HTMLElement> nextElement.children[0];
            sublist.style.zIndex = String(++DomHandler.zindex);

            sublist.style.top = '0px';
            sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
        }
    }

    onItemMouseLeave(event: Event) {
        this.activeItem = null;
    }

    itemClick(event: Event, item: MenuData[]) {
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        if (!item.url) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }

    listClick(event: Event) {
        this.activeItem = null;
    }
}


