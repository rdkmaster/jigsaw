import {Component, EventEmitter, OnInit} from "@angular/core";
import {IPopupable} from "jigsaw/service/popup.service";

@Component({
    template: `
        <j-tile trackItemBy="label" width="185px" [multipleSelect]="false"
                (selectedItemsChange)="handleSelect($event)" [(selectedItems)]="selectedItems">
            <j-tile-option *ngFor="let num of numbers" [value]="num">
                {{num.label}}
            </j-tile-option>
        </j-tile>
    `
})
export class NumberSelectPad implements IPopupable, OnInit {
    answer = new EventEmitter<any>();
    initData: any;
    selectedItems;

    numbers = '123456789'.split('').map(n => {
        return {label: n};
    });

    ngOnInit() {
        this.selectedItems = !!this.initData ? [{label: this.initData}]: null;
    }

    handleSelect(selected) {
        // 由于这个bug https://github.com/rdkmaster/jigsaw/issues/439
        // 导致这里需要通过`selected.length-1`来获取正确是索引，等这个bug修复了之后，可以直接替换为0
        this.answer.emit({selected: selected[selected.length-1].label});
    }
}
