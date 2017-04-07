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
 * 自定义单元格渲染组件
 * */
@Component({
    template: '<rdk-checkbox></rdk-checkbox>'
})
export class TableCellCheckbox extends TableCellRenderer {
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
