import {Component} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: '<span class="fa fa-bus"></span>{{cellData}}'
})
export class TableHeadIcon extends TableCellRendererBase {
}

