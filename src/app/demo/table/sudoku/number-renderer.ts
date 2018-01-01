import {Component, OnDestroy, OnInit} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";
import {PopupService} from "jigsaw/service/popup.service";
import {NumberSelectPad} from "./number-select-pad";
import {isTargetConflicted, CHECK_BOARD_STATUS, CLOSE_ALL_PAD, PUZZLE_SOLVED} from "./utils";

@Component({
    template: `
        <div (click)="onClick($event)" [style.background]="bgColor"
             (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
            {{cellData}}
        </div>
    `,
    styles: [`
        div {
            font-size: 22px;
            text-align: center;
            line-height: 48px;
            cursor: pointer;
            height: 48px;
            margin: 1px -7px 1px -7px;
        }
    `]
})
export class NumberRenderer extends TableCellRendererBase implements OnInit, OnDestroy {
    constructor(public popupService: PopupService) {
        super();
    }

    bgColor = '#ddd';
    popupInfo = null;
    conflicted = false;
    puzzleSolved = false;

    onClick(event: MouseEvent) {
        if (this.puzzleSolved) {
            return;
        }
        if (this.popupInfo) {
            this.popupInfo.dispose();
        }
        // 通知其他渲染器实例关掉已经打开的pad
        this.tableData.emit(CLOSE_ALL_PAD);
        const options = {
            pos: {x: event.clientX, y: event.clientY}, posOffset: {left: -93, top: -65}, modal: false,
            posReviser: (pos) => {
                // 单击右上角的时候，出现数字盘超出屏幕之外的问题，通过这个函数来修正
                // `pos`是自动计算出来的值，有可能存在错误
                pos.top = pos.top > 0 ? pos.top: 0;
                pos.left = pos.left > 0 ? pos.left: 0;
                return pos;
            }
        };
        this.popupInfo = this.popupService.popup(NumberSelectPad, options, this.cellData);
        this.popupInfo.answer.subscribe(value => this.onSelect(value));
    }

    onSelect(value) {
        // 更新已选中的值
        this.tableData.data[this.row][this.column] = value.selected;
        this.tableData.refresh();
        this.tableData.emit(CHECK_BOARD_STATUS);

        // 及时清理掉不必要的回掉函数是一个好习惯
        this.closeNumberSelectPad();

        this.checkStatus(value.selected);
    }

    onMouseEnter() {
        this.bgColor = this.conflicted ? '#ff9444' : '#9eddda';
    }

    onMouseLeave() {
        this.bgColor = this.getBgColor();
    }

    closeNumberSelectPad() {
        if (!this.popupInfo) {
            return;
        }
        this.popupInfo.answer.unsubscribe();
        this.popupInfo.dispose();
        this.popupInfo = null;
    }

    checkStatus(value) {
        this.conflicted = isTargetConflicted(this.tableData, value, this);
        this.bgColor = this.getBgColor();
    }

    getBgColor() {
        if (this.conflicted) {
            return '#ff6822';
        }
        const groupedCol = Math.floor(this.column / 3);
        const groupedRow = Math.floor(this.row / 3);
        return (groupedCol + groupedRow) % 2 == 0 ? '#fff' : '#ddd';
    }

    ngOnInit() {
        super.ngOnInit();
        this.bgColor = this.getBgColor();
        this.tableData.subscribe(event => {
            switch (event) {
                case CLOSE_ALL_PAD:
                    this.closeNumberSelectPad();
                    break;
                case PUZZLE_SOLVED:
                    this.puzzleSolved = true;
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.tableData.unsubscribe();
        this.closeNumberSelectPad();
    }
}
