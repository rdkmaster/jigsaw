import {Component} from '@angular/core';
import {
    PopupEffect, PopupOptions, PopupPositionOffset, PopupPositionType,
    PopupSize, CommonUtils, FloatPosition
} from "jigsaw/public_api";
import {FloatTextService} from "../doc.service";

@Component({
    selector: 'float-option',
    templateUrl: './demo.component.html',
    styles: [`
        .iconfont-e9d8 {
            color: blue;
        }

        .jigsawFloatArea {
            width: 150px;
            height: 60px;
            background: orange;
            color: #fff;
            text-align: center;
            line-height: 60px;
        }
    `]
})
export class FloatOptionDemoComponent {
    showHideEffect = "";
    selectedPositionType = "";
    position: FloatPosition = 'bottomLeft';
    size: PopupSize = {};

    offsetOptions: PopupOptions = {
        useCustomizedBackground: true,
        showEffect: PopupEffect[<string>this.showHideEffect + 'In'],
        hideEffect: PopupEffect[<string>this.showHideEffect + 'Out'],
        posType: PopupPositionType[<string>this.selectedPositionType],
        posOffset: {
            top: -10,
            left: 10
        },
        showBorder: true,
        showShadow: false,
        size: this.size,
        borderType: 'default'
    };

    shadowOptions: PopupOptions = {
        useCustomizedBackground: true,
        showEffect: PopupEffect[<string>this.showHideEffect + 'In'],
        hideEffect: PopupEffect[<string>this.showHideEffect + 'Out'],
        posType: PopupPositionType[<string>this.selectedPositionType],
        posOffset: {},
        showBorder: true,
        showShadow: true,
        size: this.size,
        borderType: 'default'
    };

    arrayOptions: PopupOptions = {
        useCustomizedBackground: true,
        showEffect: PopupEffect[<string>this.showHideEffect + 'In'],
        hideEffect: PopupEffect[<string>this.showHideEffect + 'Out'],
        posType: PopupPositionType[<string>this.selectedPositionType],
        posOffset: {},
        showBorder: true,
        showShadow: false,
        size: this.size,
        borderType: 'pointer'
    };

    constructor( public text: FloatTextService) {
    }

}
