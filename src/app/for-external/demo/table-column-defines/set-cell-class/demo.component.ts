import {Component, ElementRef, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-set-cell-class',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    //TO NOTE
    encapsulation: ViewEncapsulation.None
})
export class TableSetCellClassDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-column-defines/set-cell-class";

    tableData: TableData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            cell: {
                clazz: 'red-text'
            }
        }
    ];
}
