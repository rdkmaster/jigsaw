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

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: `{{cellData}} <jigsaw-select [(value)]="selectedCityForSelect"
                   placeholder="请选择"
                   [data]="cityListForSelect" width="70" height="20">
               </jigsaw-select>`
})
export class TableHeadSelect extends TableCellRenderer {
    selectedCityForSelect: any;
    cityListForSelect = [
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ];
}

