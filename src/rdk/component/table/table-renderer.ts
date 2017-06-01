import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, NgModule} from "@angular/core";
import {TableCellRenderer} from "./table-api";
import {TableCheckboxService, CheckboxState} from "./table-service";
import {RdkInput, RdkInputModule} from "../input/input";
import {PageableTableData} from "../../core/data/table-data";
import {CommonModule} from "@angular/common";
import {RdkCheckBoxModule} from "../checkbox/index";

/*
 * 默认表格渲染组件
 * */
@Component({
    template: '<span class="rdk-table-cell-text">{{cellData}}</span>'
})
export class DefaultCellRenderer extends TableCellRenderer {
}

/*
 * head checkbox renderer
 * */
@Component({
    template: `<rdk-checkbox  [(checked)]="cellData"
                (checkedChange)="_toggleSelectAll($event)"></rdk-checkbox>`
})
export class TableHeadCheckbox extends TableCellRenderer implements OnInit {
    constructor(private tableRendererService: TableCheckboxService, private _changeDetector: ChangeDetectorRef) {
        super();
    }

    private _toggleSelectAll(checked) {
        this.tableRendererService.headState = checked;

        let rows = [];
        this.tableRendererService.checkboxStates.forEach(checkboxState => {
            if(checkboxState.checked != checked){
                rows.push(checkboxState.row);
            }
        });

        checked ? this.tableRendererService.selectAll() : this.tableRendererService.unSelectAll();

        this.dispatchChangeEvent({rows: rows, cellData: checked, oldCellData: checked ? 0 : 1});
    }

    ngOnInit() {
        this.tableRendererService.headListen(() => {
            this.tableRendererService.headState = this.cellData = 1;
            this._changeDetector.detectChanges();
        }, () => {
            this.tableRendererService.headState = this.cellData = 0;
            this._changeDetector.detectChanges();
        }, () => {
            this.tableRendererService.headState = this.cellData = 2;
            this._changeDetector.detectChanges();
        });
    }
}

/*
 * cell checkbox renderer
 * */
@Component({
    template: '<rdk-checkbox [(checked)]="cellData" (checkedChange)="_checkedChangeHandle($event)"></rdk-checkbox>'
})
export class TableCellCheckbox extends TableCellRenderer implements OnInit {
    constructor(private tableRendererService: TableCheckboxService, private _changeDetector: ChangeDetectorRef) {
        super();
    }

    public checkboxState: CheckboxState;

    private _setHeadCheckboxState() {
        if (!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == false)) {
            this.tableRendererService.headState != 1 && this.tableRendererService.headSelect();
        } else if (!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == true)) {
            this.tableRendererService.headState != 0 && this.tableRendererService.headUnSelect();
        } else {
            this.tableRendererService.headState != 2 && this.tableRendererService.headIndeterminate();
        }
    }

    private _checkedChangeHandle(checked) {
        this.checkboxState.checked = checked;
        this._setHeadCheckboxState();
        this.dispatchChangeEvent(checked);
    }

    public setCheckboxState(checked){
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
        if (this.tableRendererService.headState != 2) {
            this._setHeadCheckboxState();
        }
        this._changeDetector.detectChanges();
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
 * 操作列
 * */
@Component({
    template: '<a href="javascript:;">修改</a> <a href="javascript:;">删除</a>',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class TableCellOption extends TableCellRenderer {
}

/*
 * 编辑单元格渲染器
 * */
@Component({
    template: `<rdk-input #input [(value)]="cellData" width="100%" [clearable]="false" (blur)="dispatchChangeEvent(cellData)"></rdk-input>`
})
export class TableCellEditor extends TableCellRenderer implements AfterViewInit {

    @ViewChild(RdkInput) input: RdkInput;

    ngAfterViewInit(){
        this.input.focus();
    }

}

@NgModule({
    declarations: [
        DefaultCellRenderer,
        TableHeadCheckbox,
        TableCellCheckbox,
        TableCellNum,
        TableCellOption,
        TableCellEditor
    ],
    imports: [
        CommonModule,
        RdkCheckBoxModule,
        RdkInputModule
    ],
})
export class RdkTableRendererModule{

}


