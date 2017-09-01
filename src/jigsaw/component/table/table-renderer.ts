import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, NgModule, OnDestroy} from "@angular/core";
import {TableCellRenderer} from "./table-api";
import {TableCheckboxService, TableCheckboxInfo} from "./table-service";
import {JigsawInput, JigsawInputModule} from "../input/input";
import {PageableTableData} from "../../core/data/table-data";
import {CommonModule} from "@angular/common";
import {JigsawCheckBoxModule} from "../checkbox/index";
import {CheckBoxStatus} from "../checkbox/typings";

/*
 * 默认表格渲染组件
 * */
@Component({
    template: '<span class="jigsaw-table-cell-text">{{cellData}}</span>'
})
export class DefaultCellRenderer extends TableCellRenderer {
}

/*
 * head checkbox renderer
 * */
@Component({
    template: `
        <jigsaw-checkbox [(checked)]="cellData"
                         (checkedChange)="_$toggleSelectAll($event)">
        </jigsaw-checkbox>`
})
export class TableHeadCheckbox extends TableCellRenderer implements OnInit, OnDestroy {
    constructor(private _tableRendererService: TableCheckboxService, private _changeDetector: ChangeDetectorRef) {
        super();
    }

    /**
     * @internal
     */
    public _$toggleSelectAll(checked: CheckBoxStatus) {
        this._tableRendererService.headState = checked;

        let rows = [];
        this._tableRendererService.checkboxStates.forEach(checkboxState => {
            if (checkboxState.checked != checked) {
                rows.push(checkboxState.row);
            }
        });

        checked ? this._tableRendererService.selectAll() : this._tableRendererService.unSelectAll();

        this.dispatchChangeEvent({rows: rows, cellData: checked, oldCellData: checked ? 0 : 1});
    }

    ngOnInit() {
        this._tableRendererService.headListen(() => {
            this._tableRendererService.headState = this.cellData = CheckBoxStatus.checked;
            this._changeDetector.detectChanges();
        }, () => {
            this._tableRendererService.headState = this.cellData = CheckBoxStatus.unchecked;
            this._changeDetector.detectChanges();
        }, () => {
            this._tableRendererService.headState = this.cellData = CheckBoxStatus.indeterminate;
            this._changeDetector.detectChanges();
        });
    }

    ngOnDestroy() {
        this._tableRendererService.reset();
    }
}

/*
 * cell checkbox renderer
 * */
@Component({
    template: '<jigsaw-checkbox [(checked)]="cellData" (checkedChange)="_$checkedChangeHandle($event)"></jigsaw-checkbox>'
})
export class TableCellCheckbox extends TableCellRenderer implements OnInit, OnDestroy {
    constructor(private tableRendererService: TableCheckboxService, private _changeDetector: ChangeDetectorRef) {
        super();
    }

    public checkboxState: TableCheckboxInfo;

    private _setHeadCheckboxState() {
        if (!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == false)) {
            this.tableRendererService.headState != CheckBoxStatus.checked && this.tableRendererService.headSelect();
        } else if (!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == true)) {
            this.tableRendererService.headState != CheckBoxStatus.unchecked && this.tableRendererService.headUnSelect();
        } else {
            this.tableRendererService.headState != CheckBoxStatus.indeterminate && this.tableRendererService.headIndeterminate();
        }
    }

    /**
     * @internal
     */
    public _$checkedChangeHandle(checked) {
        this.checkboxState.checked = checked;
        this._setHeadCheckboxState();
        this.dispatchChangeEvent(checked);
    }

    public setCheckboxState(checked) {
        checked = checked ? 1 : 0;
        this.checkboxState.checked = this.cellData = checked;
        this._setHeadCheckboxState();
        this.dispatchChangeEvent(checked);
    }

    ngOnInit() {
        this.cellData = this.cellData ? 1 : 0;
        this.tableRendererService.listen(() => {
                this.checkboxState.checked = this.cellData = 1;
                this._changeDetector.detectChanges();
            },
            () => {
                this.checkboxState.checked = this.cellData = 0;
                this._changeDetector.detectChanges();
            });
        this.checkboxState = {row: this.row, checked: this.cellData};
        this.tableRendererService.checkboxStates.push(this.checkboxState);
        if (this.tableRendererService.headState != CheckBoxStatus.indeterminate) {
            this._setHeadCheckboxState();
        }
        this._changeDetector.detectChanges();
    }

    ngOnDestroy() {
        this.tableRendererService.reset();
    }
}

/*
 * 编号列
 * */
@Component({
    template: '<span>{{number}}</span>'
})
export class TableCellNum extends TableCellRenderer implements OnInit {
    number: number;

    ngOnInit() {
        this.number = this.tableData instanceof PageableTableData ?
            (this.tableData.pagingInfo.currentPage - 1) * this.tableData.pagingInfo.pageSize + this.row + 1 :
            this.row + 1;
    }
}

/*
 * 编辑单元格渲染器
 * */
@Component({
    template: `
        <jigsaw-input #input [(value)]="cellData" width="100%" [clearable]="false"
                      (blur)="dispatchChangeEvent(cellData)"></jigsaw-input>`
})
export class TableCellEditor extends TableCellRenderer implements AfterViewInit {

    @ViewChild(JigsawInput) input: JigsawInput;

    ngAfterViewInit() {
        this.input.focus();
    }

}

@NgModule({
    declarations: [
        DefaultCellRenderer,
        TableHeadCheckbox,
        TableCellCheckbox,
        TableCellNum,
        TableCellEditor
    ],
    imports: [
        CommonModule,
        JigsawCheckBoxModule,
        JigsawInputModule
    ],
})
export class JigsawTableRendererModule {
}


