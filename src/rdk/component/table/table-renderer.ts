import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {TableCellRenderer} from "./table-api";
import {TableCheckboxService, CheckboxState} from "./table-service";
import {RdkInput} from "../input/input";

/*
 * 默认表头渲染组件
 * */
@Component({
    template: '<span>{{cellData}}</span>'
})
export class TableHeadDefault extends TableCellRenderer {
}

/*
 * 默认单元格渲染组件
 * */
@Component({
    template: '<span>{{cellData}}</span>'
})
export class TableCellDefault extends TableCellRenderer {
}


/*
 * head checkbox renderer
 * */
@Component({
    template: `<rdk-checkbox  [(checked)]="cellData"
                (checkedChange)="_toggleSelectAll($event)"></rdk-checkbox>`
})
export class TableHeadCheckbox extends TableCellRenderer implements OnInit{
    constructor(private tableRendererService: TableCheckboxService){
        super();
    }

    private _toggleSelectAll(checked){
        this.tableRendererService.headState = checked;
        if(checked){
            this.tableRendererService.selectAll();
        }else{
            this.tableRendererService.unSelectAll();
        }
    }

    ngOnInit(){
        this.tableRendererService.headListen(() => {
            this.tableRendererService.headState = this.cellData = 1;
        }, () => {
            this.tableRendererService.headState = this.cellData = 0;
        }, () => {
            this.tableRendererService.headState = this.cellData = 2;
        });
    }
}

/*
 * cell checkbox renderer
 * */
@Component({
    template: '<rdk-checkbox [(checked)]="cellData" (checkedChange)="_setCheckboxState($event)"></rdk-checkbox>'
})
export class TableCellCheckbox extends TableCellRenderer implements OnInit{
    constructor(private tableRendererService: TableCheckboxService){
        super();
    }

    private _checkboxState: CheckboxState;

    private _setHeadCheckboxState(){
        if(!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == false)){
            this.tableRendererService.headState != 1 && this.tableRendererService.headSelect();
        }else if(!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == true)){
            this.tableRendererService.headState != 0 && this.tableRendererService.headUnSelect();
        }else{
            this.tableRendererService.headState != 2 && this.tableRendererService.headIndeterminate();
        }
    }

    private _setCheckboxState(checked){
        this._checkboxState.checked = checked;
        this._setHeadCheckboxState();
    }

    ngOnInit(){
        this.cellData = this.cellData ? 1 : 0;
        this.tableRendererService.listen(() => {this._checkboxState.checked = this.cellData = 1},
            () => {this._checkboxState.checked = this.cellData = 0});
        this._checkboxState = {row: this.row, checked: this.cellData};
        this.tableRendererService.checkboxStates.push(this._checkboxState);
        if(this.tableRendererService.headState != 2){
            this._setHeadCheckboxState();
        }
    }
}

/*
 * 编号列头
 * */
@Component({
    template: '<span>#</span>'
})
export class TableHeadNum extends TableCellRenderer {
}

/*
 * 编号列
 * */
@Component({
    template: '<span>{{row + 1}}</span>'
})
export class TableCellNum extends TableCellRenderer {
}

/*
 * 操作列头
 * */
@Component({
    template: '<span>操作</span>'
})
export class TableHeadOption extends TableCellRenderer {
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
    template: `<rdk-input #input [(value)]="cellData" width="100%" [clearable]="false" (blur)="_goText()"></rdk-input>`
})
export class TableCellEditor extends TableCellRenderer implements AfterViewInit{

    @ViewChild(RdkInput) input: RdkInput;

    _goText(): void {
        this.changeToText.emit(this.cellData);
    }

    ngAfterViewInit(){
        this.input.focus();
    }

}


