import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

import {AbstractJigsawComponent} from "../common";
import {PopupService} from "../../service/popup.service";
import {MenuData} from "./menu.typings";

@Component({
    selector: 'jigsaw-menu, j-menu',
    template: `<ng-content></ng-content>`,
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
    @Input()
    set data(data: MenuData){

    }

    constructor(public popupService: PopupService) {
        super();
    }

    ngOnInit() {
    }

}
