import {Component} from "@angular/core";
import {TableCellRenderer} from "../../../../../component/table/table-api";

/*
* 自定义单元格渲染组件
* */
@Component({
    template: '<span>{{cellData}}</span>'
})
export class TableCell extends TableCellRenderer {
}

/*
* 自定义表头渲染组件
* */
@Component({
    template: '<span class="fa fa-map-signs"></span>{{cellData}}'
})
export class TableHead extends TableCellRenderer {
}
