import {AfterViewInit, Component, EventEmitter, Input, NgModule, OnDestroy, Output, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawInput, JigsawInputModule} from "../input/input";
import {JigsawCheckBoxModule} from "../checkbox/index";
import {CheckBoxStatus} from "../checkbox/typings";
import {TableData} from "../../core/data/table-data";

export class TableCellRendererBase {
    public dispatchChangeEvent(value: any): void {
        this.cellDataChange.emit(value)
    }

    @Input() public tableData: TableData;
    @Input() public cellData: any;
    @Input() public row: number;
    @Input() public column: number;

    @Output() public cellDataChange = new EventEmitter<any>();
}

/*
 * 默认表格渲染组件
 * */
@Component({
    template: '<span class="jigsaw-table-cell-text">{{cellData}}</span>'
})
export class DefaultCellRenderer extends TableCellRendererBase {
}

/*
 * 编辑单元格渲染器
 * */
@Component({
    template: `
        <jigsaw-input #input [value]="cellData" width="100%" (blur)="dispatchChangeEvent(cellData)">
        </jigsaw-input>
    `
})
export class TableCellTextEditorRenderer extends TableCellRendererBase implements AfterViewInit {

    @ViewChild(JigsawInput) input: JigsawInput;

    ngAfterViewInit() {
        this.input.focus();
    }
}

/*
 * head checkbox renderer
 * */
@Component({
    template: `<jigsaw-checkbox [(checked)]="cellData"></jigsaw-checkbox>`
})
export class TableHeadCheckboxRenderer extends TableCellRendererBase implements OnDestroy {
    private _cellData;

    public get cellData() {
        return this._cellData;
    }

    public set cellData(value) {
        this._cellData = value;
        if (value != CheckBoxStatus.indeterminate) {
            this.tableData.data.forEach(row => row[this.column] = value);
            this.tableData.refresh();
        }
    }

    private _removeRefreshCallback: Function;
    private _tableData: TableData;

    public get tableData(): TableData {
        return this._tableData;
    }

    public set tableData(value: TableData) {
        if (!value || value == this._tableData) {
            return;
        }
        this._tableData = value;

        this._removeRefreshCallback && this._removeRefreshCallback();
        this._removeRefreshCallback = this._tableData.onRefresh(() => {
            let type = 0;
            this._tableData.data.forEach(row => type |= (!!row[this.column] ? 2 : 1));
            switch (type) {
                case 3:
                    this._cellData = CheckBoxStatus.indeterminate;
                    break;
                case 2:
                    this._cellData = CheckBoxStatus.checked;
                    break;
                case 1:
                case 0:
                default:
                    this._cellData = CheckBoxStatus.unchecked;
            }
        });
    }

    ngOnDestroy() {
        this._removeRefreshCallback && this._removeRefreshCallback();
    }
}

/*
 * head checkbox renderer
 * */
@Component({
    template: `
        <jigsaw-checkbox [checked]="cellData" (checkedChange)="onChange($event)">
        </jigsaw-checkbox>
    `
})
export class TableCellCheckboxRenderer extends TableCellRendererBase {
    onChange(value) {
        if (value != this.cellData) {
            this.dispatchChangeEvent(value);
        }
    }
}

@NgModule({
    declarations: [
        DefaultCellRenderer, TableCellTextEditorRenderer, TableHeadCheckboxRenderer, TableCellCheckboxRenderer
    ],
    imports: [
        CommonModule, JigsawCheckBoxModule, JigsawInputModule
    ]
})
export class JigsawTableRendererModule {
}


