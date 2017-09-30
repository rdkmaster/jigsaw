import {
    AfterViewInit, Component, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawInput, JigsawInputModule} from "../input/input";
import {JigsawCheckBoxModule} from "../checkbox/index";
import {CheckBoxStatus} from "../checkbox/typings";
import {TableData} from "../../core/data/table-data";
import {_getColumnIndex, AdditionalTableData} from "./table-typings";
import {CommonUtils} from "../../core/utils/common-utils";

export class TableCellRendererBase implements OnInit, OnDestroy {
    @Input() public cellData: any;
    @Input() public row: number;
    @Input() public field: string;

    @Output() public cellDataChange = new EventEmitter<any>();

    protected targetData: TableData;
    private _removeTableDataRefresh: Function;
    private _removeAdditionalDataRefresh: Function;

    private _column: number = -1;

    public get column(): number {
        return this._column;
    }

    protected onDataRefresh(): void {
    }

    public dispatchChangeEvent(value: any): void {
        this.cellDataChange.emit(value)
    }

    private _tableData: TableData;

    @Input()
    public get tableData(): TableData {
        return this._tableData;
    }

    public set tableData(value: TableData) {
        this._tableData = value;
        this._initTargetData();
        if (this._removeTableDataRefresh) {
            this._removeTableDataRefresh();
        }
        this._removeTableDataRefresh = this._tableData.onRefresh(this.onDataRefresh, this);
    }

    protected _additionalData: AdditionalTableData;

    @Input()
    public get additionalData(): TableData {
        return this._additionalData;
    }

    public set additionalData(value: TableData) {
        this._additionalData = <AdditionalTableData>value;
        if (this._removeAdditionalDataRefresh) {
            this._removeAdditionalDataRefresh();
        }
        this._removeAdditionalDataRefresh = this._additionalData.onRefresh(this.onDataRefresh, this);
        this._initTargetData();
    }

    private _initTargetData(): void {
        if (!this.tableData || !this.additionalData) {
            return;
        }
        [this._column, this.targetData] = _getColumnIndex(this._tableData, this._additionalData, this.field);
    }

    ngOnDestroy() {
        if (this._removeTableDataRefresh) {
            this._removeTableDataRefresh();
        }
        if (this._removeAdditionalDataRefresh) {
            this._removeAdditionalDataRefresh();
        }
    }

    ngOnInit() {
        this.onDataRefresh();
    }
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
        <jigsaw-input #input [(value)]="cellData" width="100%" [blurOnClear]="false"
                      (blur)="dispatchChangeEvent(cellData)">
        </jigsaw-input>
    `
})
export class TableCellTextEditorRenderer extends TableCellRendererBase implements AfterViewInit {

    @ViewChild(JigsawInput)
    protected input: JigsawInput;

    ngAfterViewInit() {
        this.input.focus();
    }
}

/*
 * head checkbox renderer
 * */
@Component({
    template: `
        <jigsaw-checkbox [(checked)]="checked"></jigsaw-checkbox>`
})
export class TableHeadCheckboxRenderer extends TableCellRendererBase {
    private _checked: CheckBoxStatus = CheckBoxStatus.unchecked;

    public get checked(): CheckBoxStatus {
        return this._checked;
    }

    public set checked(value: CheckBoxStatus) {
        this._checked = value;
        this.targetData.data.forEach((row, index) => {
            row[this.column] = value;
            this._additionalData.cacheValue(this.field, index, value);
        });
        this.targetData.refresh();
    }

    protected onDataRefresh(): void {
        let type = 0;
        this.targetData.data.forEach((row, index) => {
            let value = this._additionalData.getTouchedValue(this.field, index);
            value = CommonUtils.isDefined(value) ? value : !!row[this.column];
            type |= value ? 2 : 1;
        });
        switch (type) {
            case 3:
                this._checked = CheckBoxStatus.indeterminate;
                break;
            case 2:
                this._checked = CheckBoxStatus.checked;
                break;
            case 1:
            case 0:
            default:
                this._checked = CheckBoxStatus.unchecked;
        }
    }
}

/*
 * head checkbox renderer
 * */
@Component({
    template: `
        <jigsaw-checkbox [checked]="checked" (checkedChange)="onChange($event)">
        </jigsaw-checkbox>
    `
})
export class TableCellCheckboxRenderer extends TableCellRendererBase {
    protected onDataRefresh() {
        this._updateChecked();
        if (CommonUtils.isDefined(this.targetData.data[this.row])) {
            this.targetData.data[this.row][this.column] = this.checked;
        }
    }

    public checked: boolean;

    private _cellData: any;

    public get cellData(): any {
        return this._cellData;
    }

    public set cellData(value: any) {
        this._cellData = value;
        this._updateChecked();
    }

    private _updateChecked(): void {
        let checked = this._additionalData.getTouchedValue(this.field, this.row);
        checked = CommonUtils.isDefined(checked) ? checked : this.cellData;
        this.checked = checked;
    }

    onChange(value) {
        this.checked = value;
        this._additionalData.cacheValue(this.field, this.row, value);
        this.targetData.data[this.row][this.column] = value;
        this.dispatchChangeEvent(value);
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


