import {Component} from "@angular/core";
import {TableCellRenderer} from "./table-api";
import {TableCheckboxService, CheckboxState} from "./table-service";

/*
 * head checkbox renderer
 * */
@Component({
    template: '<rdk-checkbox [(checked)]="cellData" (checkedChange)="toggleSelectAll($event)"></rdk-checkbox>'
})
export class TableHeadCheckbox extends TableCellRenderer {
    constructor(private tableRendererService: TableCheckboxService){
        super();
        this.tableRendererService.headListen(() => {
            this.tableRendererService.headState = this.cellData = 1;
        }, () => {
            this.tableRendererService.headState = this.cellData = 0;
        });
        this.tableRendererService.headState = this.cellData;
    }

    toggleSelectAll(checked){
        this.tableRendererService.headState = checked;
        if(checked){
            this.tableRendererService.selectAll();
        }else{
            this.tableRendererService.unSelectAll();
        }
    }
}

/*
 * cell checkbox renderer
 * */
@Component({
    template: '<rdk-checkbox [(checked)]="cellData" (checkedChange)="setCheckboxState($event)"></rdk-checkbox>'
})
export class TableCellCheckbox extends TableCellRenderer{
    constructor(private tableRendererService: TableCheckboxService){
        super();
        this.tableRendererService.listen(() => {this.cellData = 1}, () => {this.cellData = 0});
    }

    private checkboxState: CheckboxState;

    setCheckboxState(checked){
        if(this.checkboxState){
            this.checkboxState.checked = checked;
        }else{
            this.tableRendererService.checkboxStates.push({row: this.row, checked: checked});
            this.checkboxState = this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.row == this.row);
        }

        if(!this.tableRendererService.checkboxStates.find(checkboxState => checkboxState.checked == false)){
            !this.tableRendererService.headState && this.tableRendererService.headSelect();
        }else{
            this.tableRendererService.headState && this.tableRendererService.headUnSelect();
        }
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


