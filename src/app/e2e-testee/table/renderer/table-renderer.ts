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
        <jigsaw-select [value]="cellData" (valueChange)="dispatchChangeEvent($event)"
                       [data]="officeList" width="70" height="20">
        </jigsaw-select>
    `
})
export class OfficeEditor extends TableCellRendererBase {
    officeList = [
        {label: 'Online I'}, {label: 'Online II'},
        {label: 'Offline I'}, {label: 'Offline II'},
        {label: 'Platform I'}, {label: 'Platform II'}, {label: 'Platform III'}
    ]
}




//
// /*
//  * 编辑单元格渲染器
//  * */
// @Component({
//     template: `
//         <jigsaw-input #input [(value)]="cellData" width="100%" [blurOnClear]="false"
//                       (blur)="dispatchChangeEvent(cellData)">
//         </jigsaw-input>
//     `
// })
// export class TableCellTextEditorRenderer extends TableCellRendererBase implements AfterViewInit {
//
//     @ViewChild(JigsawInput)
//     protected input: JigsawInput;
//
//     ngAfterViewInit() {
//         this.input.focus();
//     }
// }









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
