import {Component, OnInit} from '@angular/core';
import {
    PopupEffect,
    PopupOptions,
    PopupPositionOffset,
    PopupPositionType,
    PopupSize
} from "../../../../jigsaw/service/popup.service";
import {CommonUtils} from "../../../../jigsaw/core/utils/common-utils";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .fa-bars {
            margin: 20px 100px;
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

        .row {
            margin: 6px;
        }

        .group {
            width: 380px;
            overflow: hidden;
            display: inline-block;
        }
        
        .wrapper {
            display: flex;
            height: 220px;
        }

        label {
            min-width: 50px
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
    _$height = 'auto';

    valueChange() {
        this.options = {};
        this.options.showEffect = PopupEffect[<string>this.showHideEffect + 'In'];
        this.options.hideEffect = PopupEffect[<string>this.showHideEffect + 'Out'];
        this.options.posType = PopupPositionType[<string>this.selectedPositionType];
        this.options.posOffset = this.offset;
        this.options.showBorder = this.showBorder;
        this.options.size = this.size;
    }

    get optionsString(): string {
        const options: any = CommonUtils.deepCopy(this.options);
        options.showEffect = PopupEffect[this.options.showEffect];
        options.hideEffect = PopupEffect[this.options.hideEffect];
        options.posType = PopupPositionType[this.options.posType];

        return JSON.stringify(options, null, '    ')
            .replace(/\n/g, '<br>')
            .replace(/\s/g, '&nbsp;');
    }

    expandHeight() {
        this._$height = '3000px';
    }

    ngOnInit() {
        this.valueChange();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何改变float option参数';
    description: string = '';
}
