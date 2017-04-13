import {Component, OnInit} from "@angular/core";
import {TableCellRenderer} from "./table-api";
import {TableCheckboxService, CheckboxState} from "./table-service";

/*
 * head checkbox renderer
 * */
@Component({
    template: `<rdk-checkbox  [(checked)]="cellData"
                (checkedChange)="toggleSelectAll($event)"
                [enableIndeterminate]="true"></rdk-checkbox>`
})
export class TableHeadCheckbox extends TableCellRenderer implements OnInit{
    constructor(private tableRendererService: TableCheckboxService){
        super();
    }

    toggleSelectAll(checked){
        this.tableRendererService.headState = checked;
        if(checked){
            this.tableRendererService.selectAll();
        }else{
            this.tableRendererService.unSelectAll();
        }
        console.log(this.tableRendererService.checkboxStates);
    }

    ngOnInit(){
        this.tableRendererService.headListen(() => {
            this.tableRendererService.headState = this.cellData = 1;
        }, () => {
            this.tableRendererService.headState = this.cellData = 0;
        }, () => {
            this.tableRendererService.headState = this.cellData = 2;
        });
        this.tableRendererService.headState = this.cellData = 0;
    }
}

/*
 * cell checkbox renderer
 * */
@Component({
    template: '<rdk-checkbox [(checked)]="cellData" (checkedChange)="setCheckboxState($event)"></rdk-checkbox>'
})
export class TableCellCheckbox extends TableCellRenderer implements OnInit{
    constructor(private tableRendererService: TableCheckboxService){
        super();
    }

    private _checkboxState: CheckboxState;

    setCheckboxState(checked){
        this._checkboxState.checked = checked;

        if(!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == false)){
            this.tableRendererService.headState != 1 && this.tableRendererService.headSelect();
        }else if(!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == true)){
            this.tableRendererService.headState != 0 && this.tableRendererService.headUnSelect();
        }else{
            this.tableRendererService.headState != 2 && this.tableRendererService.headIndeterminate();
        }
    }

    ngOnInit(){
        this.cellData = this.cellData ? 1 : 0;
        this.tableRendererService.listen(() => {this._checkboxState.checked = this.cellData = 1},
            () => {this._checkboxState.checked = this.cellData = 0});
        this._checkboxState = {row: this.row, checked: this.cellData};
        this.tableRendererService.checkboxStates.push(this._checkboxState);
    }
}

/*
 * 编号列头
 * */
@Component({
    template: '<span>编号</span>'
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
 * 自定义表头渲染组件
 * */
@Component({
    template: '<span>操作</span>'
})
export class TableHeadOption extends TableCellRenderer {
}

/*
 * 自定义单元格渲染组件
 * */
@Component({
    template: '<a href="javascript:;">修改</a> <a href="javascript:;">删除</a>',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class TableCellOption extends TableCellRenderer {
}


