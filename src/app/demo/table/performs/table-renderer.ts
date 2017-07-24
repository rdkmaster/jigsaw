import {Component} from "@angular/core";
import {TableCellRenderer} from "jigsaw/component/table/table-api";

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: '<span class="fa fa-bus"></span>{{cellData}}'
})
export class TableHeadIcon extends TableCellRenderer {
}

