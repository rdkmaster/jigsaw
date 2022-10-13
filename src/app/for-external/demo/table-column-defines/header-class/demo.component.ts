import {Component, ElementRef, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-header-class',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TableSetHeaderClassDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-column-defines/header-class";

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
            header: {
                clazz: 'red-text'
            }
        }
    ];
}
