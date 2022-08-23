import { Component } from '@angular/core';
import {
    PopupEffect, PopupOptions, PopupPositionOffset, PopupPositionType,
    PopupSize, CommonUtils, FloatPosition
} from "jigsaw/public_api";
import { FloatTextService } from "../doc.service";

@Component({
    selector: 'float-option',
    templateUrl: './demo.component.html'
})
export class FloatOptionDemoComponent {
    public showHideEffect = "";
    public selectedPositionType = "";
    public position: FloatPosition = 'bottomLeft';
    public size: PopupSize = {};

    public offsetOptions: PopupOptions = {
        useCustomizedBackground: true,
        showEffect: PopupEffect[<string>this.showHideEffect + 'In'],
        hideEffect: PopupEffect[<string>this.showHideEffect + 'Out'],
        posType: PopupPositionType[<string>this.selectedPositionType],
        posOffset: {
            top: 10,
            left: -20
        },
        showBorder: true,
        showShadow: false,
        size: this.size,
        borderType: 'default'
    };

    public shadowOptions: PopupOptions = {
        useCustomizedBackground: true,
        showEffect: PopupEffect[<string>this.showHideEffect + 'In'],
        hideEffect: PopupEffect[<string>this.showHideEffect + 'Out'],
        posType: PopupPositionType[<string>this.selectedPositionType],
        posOffset: {},
        showBorder: false,
        showShadow: true,
        size: this.size,
        borderType: 'default'
    };

    public arrayOptions: PopupOptions = {
        useCustomizedBackground: true,
        showEffect: PopupEffect[<string>this.showHideEffect + 'In'],
        hideEffect: PopupEffect[<string>this.showHideEffect + 'Out'],
        posType: PopupPositionType[<string>this.selectedPositionType],
        posOffset: {},
        showBorder: true,
        showShadow: true,
        size: this.size,
        borderType: 'pointer'
    };

    constructor(public doc: FloatTextService) {
    }

}
