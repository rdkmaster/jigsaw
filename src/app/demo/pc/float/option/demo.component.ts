import {Component, OnInit} from '@angular/core';
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
export class FloatOptionDemoComponent implements OnInit {
    showHideEffect = "";
    selectedPositionType = "";
    offset: PopupPositionOffset = {};
    showBorder = true;
    showShadow = true;
    showArrow = true;
    position: FloatPosition = 'bottomLeft';
    size: PopupSize = {};
    options: PopupOptions = {useCustomizedBackground: true};
    constructor( public text: FloatTextService) {
    }
    valueChange() {
        this.options = {useCustomizedBackground: true};
        this.options.showEffect = PopupEffect[<string>this.showHideEffect + 'In'];
        this.options.hideEffect = PopupEffect[<string>this.showHideEffect + 'Out'];
        this.options.posType = PopupPositionType[<string>this.selectedPositionType];
        this.options.posOffset = this.offset;
        this.options.showBorder = this.showBorder;
        this.options.showShadow = this.showShadow;
        this.options.size = this.size;
        this.options.borderType = this.showArrow ? 'pointer' : 'default';
    }
    ngOnInit() {
        this.valueChange();
    }

}
