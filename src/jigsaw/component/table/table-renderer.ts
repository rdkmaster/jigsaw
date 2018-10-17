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
import {JigsawSwitchModule} from "../switch/index";
import {Subscription} from "rxjs/Subscription";
import {JigsawSelectModule} from "../select/select";
import {ArrayCollection} from "../../core/data/array-collection";

export class TableCellRendererBase implements OnInit, OnDestroy {
    @Input() public cellData: any;
    @Input() public row: number;
    @Input() public field: string;
    @Input() public initData: any;

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
            this._additionalData.touchValueByRow(this.field, index, value);
        });
        this.targetData.refresh();
    }

    protected onDataRefresh(): void {
        let type = 0;
        this.targetData.data.forEach((row, index) => {
            let value = this._additionalData.getTouchedValueByRow(this.field, index);
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
 * cell checkbox renderer
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
        this._updateTargetData();
    }

    public checked: boolean;

    private _cellData: any;

    public get cellData(): any {
        return this._cellData;
    }

    public set cellData(value: any) {
        this._cellData = value;
        this._updateChecked();
        this._updateTargetData();
    }

    private _updateChecked(): void {
        let checked = this._additionalData.getTouchedValueByRow(this.field, this.row);
        checked = CommonUtils.isDefined(checked) ? checked : this.cellData;
        this.checked = checked;
    }

    private _updateTargetData() {
        if (CommonUtils.isDefined(this.targetData.data[this.row])) {
            this.targetData.data[this.row][this.column] = this.checked;
        }
    }

    onChange(value) {
        this.checked = value;
        this._additionalData.touchValueByRow(this.field, this.row, value);
        this._updateTargetData();
        this.dispatchChangeEvent(value);
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this._additionalData.trackRowBy && this.row == 0) { // this.row == 0 ensures print once
            console.warn('You may need to add a [trackRowBy="field-name"] attribute to ' +
                'the table if using a renderer which has status.');
        }
    }
}

/*
 * switch renderer
 * */
@Component({
    template: '<j-switch [(checked)]="cellData" (checkedChange)="dispatchChangeEvent(cellData)"></j-switch>'
})
export class TableCellSwitchRenderer extends TableCellRendererBase {

}

export type InitDataGenerator = (td: TableData, row: number, column: number) => ArrayCollection<any> | any[];

/**
 * Select renderer
 */
@Component({
    template: `
        <jigsaw-select [value]="selected" (valueChange)="dispatchChangeEvent($event.label)"
                       [data]="data" width="100%" height="25">
        </jigsaw-select>
    `
})
export class TableCellSelectRenderer extends TableCellRendererBase implements OnInit, OnDestroy {
    public selected: any;
    public initData: InitDataGenerator | ArrayCollection<any> | any[];
    public data: ArrayCollection<any> | any[];

    protected onDataRefresh() {
        super.onDataRefresh();
        if (this.initData instanceof Function) {
            this.data = this.initData(this.tableData, this.row, this.column);
        } else {
            this.data = this.initData;
        }
    }

    private _cellData: any;

    @Input()
    get cellData(): any {
        return this._cellData;
    }

    set cellData(value: any) {
        this._cellData = value;
        this.selected = {label: this.cellData};
    }

    subscriber: Subscription;

    ngOnInit() {
        super.ngOnInit();

        // 使用此方法使其他单元格退出编辑状态
        this.tableData.emit(this);
        this.subscriber = this.tableData.subscribe(renderer => {
            if (this != renderer) {
                this.dispatchChangeEvent(this.cellData);
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();

        // 随手清理垃圾是一个好习惯
        if (this.subscriber) {
            this.subscriber.unsubscribe();
            this.subscriber = null;
        }
    }
}

@NgModule({
    declarations: [
        DefaultCellRenderer, TableCellTextEditorRenderer, TableHeadCheckboxRenderer,
        TableCellCheckboxRenderer, TableCellSwitchRenderer, TableCellSelectRenderer
    ],
    imports: [
        CommonModule, JigsawCheckBoxModule, JigsawInputModule, JigsawSwitchModule, JigsawSelectModule
    ]
})
export class JigsawTableRendererModule {
}


