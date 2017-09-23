import {Component, OnDestroy, OnInit} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";
import {TableData} from "../../../../jigsaw/core/data/table-data";

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: '<span class="fa fa-bus"></span>{{cellData}}',
    styles: [`.fa{margin-right: 5px}`]
})
export class TableHeadIcon extends TableCellRendererBase {
}

@Component({
    template: `
        <jigsaw-select [value]="selected" (valueChange)="onChange($event)"
                       [data]="officeList" width="170" height="25">
        </jigsaw-select>
    `
})
export class OfficeEditor extends TableCellRendererBase {
    selected: any;
    officeList = [
        {label: 'Online I'}, {label: 'Online II'},
        {label: 'Offline I'}, {label: 'Offline II'},
        {label: 'Platform I'}, {label: 'Platform II'}, {label: 'Platform III'}
    ];

    onChange(selected) {
        if (selected === this.selected) {
            return;
        }
        this.dispatchChangeEvent(selected.label);
    }

    onDataRefresh() {
        this.selected = {label: this.cellData};
    }
}

@Component({
    template: `
        <span class="fa fa-edit"></span> {{cellData}}
    `
})
export class OfficeRenderer extends TableCellRendererBase {
}

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: `
        <jigsaw-select [value]="selected"
                       placeholder="{{cellData}}" (valueChange)="dispatchChangeEvent($event)"
                       [data]="listItems" width="70" height="20">
        </jigsaw-select>
    `
})
export class TableHeadSelect extends TableCellRendererBase {
    selected: any;
    listItems = [];

    protected onDataRefresh():void {
        this.listItems = [];
        this.tableData.data.forEach(row => {
            if (!this.listItems.find(item => item.label === row[this.column])) {
                this.listItems.push({label: row[this.column]});
            }
        });
    }
}

/*
 * 操作列
 * */
@Component({
    template: '<a href="javascript:;">修改</a> <a href="javascript:;">删除</a>',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class TableCellOperation extends TableCellRendererBase {
    constructor() {
        super();
        console.log('dddddddddddddddddddddddddd')
    }
}
