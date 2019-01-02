import {Component, OnInit} from '@angular/core';
import {PopupEffect, PopupOptions, PopupPositionOffset, PopupPositionType, PopupSize} from "../../../../jigsaw/service/popup.service";
import {CommonUtils} from "../../../../jigsaw/core/utils/common-utils";

@Component({
    templateUrl: './demo.component.html',
    styles: [`.fa-bars{
                     margin: 100px;
               }
               .jigsawFloatArea{
                   width:150px;
                   height:60px;
                   background:orange;
                   color:#fff;
                   text-align:center;
                   line-height:60px;
               }
               .row {
                    margin: 6px;
                }
                .wrapper {
                    width: 380px;
                    margin: auto;
                    overflow: hidden;
                }
                label{
                    min-width:50px
                }
                .code{
                    word-wrap: break-word;
                }
    `]
})
export class FloatOptionDemo implements OnInit {
    showHideEffect = "";
    selectedPositionType = "";
    offset: PopupPositionOffset = {};
    showBorder = true;
    size: PopupSize = {};
    options: PopupOptions = {};
    optionStr = '{}';
    _$height = 'auto';

    valueChange() {
        this.options = {};
        this.options.showEffect = PopupEffect[<string>this.showHideEffect + 'In'];
        this.options.hideEffect = PopupEffect[<string>this.showHideEffect + 'Out'];
        this.options.posType = PopupPositionType[<string>this.selectedPositionType];
        this.options.posOffset = this.offset;
        this.options.showBorder = this.showBorder;
        this.options.size = this.size;
        this.optionStr = "{";
        let temp = [];
        if (this.showHideEffect) {
            temp.push(`showEffect:PopupEffect.${this.showHideEffect}In`);
            temp.push(`hideEffect:PopupEffect.${this.showHideEffect}Out`);
        }
        if (this.selectedPositionType) {
            temp.push(`posType:PopupPositionType.${this.selectedPositionType}`);
        }
        if (CommonUtils.isDefined(this.offset.left) || CommonUtils.isDefined(this.offset.top)) {
            temp.push(`posOffset:{${CommonUtils.isDefined(this.offset.left) ? `left:${this.offset.left},` : ''}
            ${CommonUtils.isDefined(this.offset.top) ? `top:${this.offset.top}` : ''}}`);
        }
        temp.push(`showBorder:${this.showBorder}`);
        if (CommonUtils.isDefined(this.size.width) || CommonUtils.isDefined(this.size.minWidth)
            || CommonUtils.isDefined(this.size.height)) {
            temp.push(`size:{${CommonUtils.isDefined(this.size.width) ? `width:${this.size.width},` : ''}
            ${CommonUtils.isDefined(this.size.minWidth) ? `minWidth:${this.size.minWidth},` : ''}
            ${CommonUtils.isDefined(this.size.height) ? `height:${this.size.height}` : ''}}`);
        }
        this.optionStr = `{${temp.join(',')}}`;
    }

    expandHeight() {
        this._$height = '2000px';
    }

    ngOnInit() {
        this.valueChange();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何改变float option参数';
    description: string = '';
    tags: string[] = [
        'JigsawFloat.jigsawFloatOptions',
    ];
}
