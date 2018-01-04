import {Component, EventEmitter, OnInit} from "@angular/core";
import {IPopupable} from "jigsaw/service/popup.service";
import {JigsawWarningAlert} from "../../../../jigsaw/component/alert/alert";

@Component({
    template: `
        <div>
            <div class="toolbar">
                <span (click)="onClick('eraser')" class="fa fa-eraser"></span>
                <span (click)="onClick('pencil')" class="fa fa-pencil"></span>
                <span (click)="onClick('close')" class="fa fa-times"></span>
            </div>
            <j-tile trackItemBy="label" width="185px" [multipleSelect]="false"
                    (selectedItemsChange)="onSelect($event)" [(selectedItems)]="selectedItems">
                <j-tile-option *ngFor="let num of numbers" [value]="num">
                    {{num.label}}
                </j-tile-option>
            </j-tile>
        </div>
    `,
    styles: [`
        .toolbar {
            font-size: 15px;
            background-color: #fff;
            border-radius: 4px;
            padding: 6px 12px 6px 0;
            text-align: right;
        }

        span {
            margin-left: 12px;
            cursor: pointer;
        }
    `]
})
export class NumberSelectPad implements IPopupable, OnInit {
    answer = new EventEmitter<any>();
    initData: any;
    selectedItems;

    numbers = '123456789'.split('').map(n => {
        return {label: n};
    });

    onClick(type) {
        if (type == 'pencil') {
            JigsawWarningAlert.show('Not implemented yet!');
            return;
        }
        this.answer.emit({selected: type == 'eraser' ? '' : type});
    }

    ngOnInit() {
        this.selectedItems = !!this.initData ? [{label: this.initData}] : null;
    }

    onSelect(selected) {
        // 由于这个bug https://github.com/rdkmaster/jigsaw/issues/439
        // 导致这里需要通过`selected.length-1`来获取正确是索引，等这个bug修复了之后，可以直接替换为0
        this.answer.emit({selected: selected[selected.length - 1].label});
    }
}
