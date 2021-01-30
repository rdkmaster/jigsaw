import {Component, EventEmitter, OnInit} from "@angular/core";
import {IPopupable, JigsawWarningAlert} from "jigsaw/public_api";

@Component({
    template: `
        <div>
            <div class="toolbar">
                <span (click)="onClick('eraser')" class="iconfont iconfont-e9b6"></span>
                <span (click)="onClick('pencil')" class="iconfont iconfont-e166"></span>
                <span (click)="onClick('close')" class="iconfont iconfont-e9b8"></span>
            </div>
            <j-tile trackItemBy="label" width="214px" [multipleSelect]="false"
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
        this.answer.emit({selected: selected[0].label});
    }
}
