import {Component} from "@angular/core";
import {TableCellRenderer} from "../../../../../component/table/table-api";
import {TableRendererService, CheckboxState} from "./tableRendererService";

/*
 * 自定义单元格渲染组件
 * */
@Component({
    template: '<span>{{cellData}}</span>'
})
export class TableCell extends TableCellRenderer {
}

/*
 * head checkbox renderer
 * */
@Component({
    template: '<rdk-checkbox [(checked)]="cellData" (checkedChange)="toggleSelectAll($event)"></rdk-checkbox>'
})
export class TableHeadCheckbox extends TableCellRenderer {
    constructor(private tableRendererService: TableRendererService){
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
    constructor(private tableRendererService: TableRendererService){
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
 * 自定义单元格渲染组件
 * */
@Component({
    template: '<a href="javascript:;">修改</a> <a href="javascript:;">删除</a>',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class TableCellOption extends TableCellRenderer {
}

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: '<span class="fa fa-map-signs"></span>{{cellData}}'
})
export class TableHead extends TableCellRenderer {
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
 * 自定义表头渲染组件
 * */
@Component({
    template: `{{cellData}} <rdk-select [(value)]="selectedCityForSelect"
                   placeholder="请选择"
                   [data]="cityListForSelect" width="70" height="20">
               </rdk-select>`
})
export class TableHeadSelect extends TableCellRenderer {
    cityListForSelect = [
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ];
}
