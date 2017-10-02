import {
    Component, ViewEncapsulation, Renderer2, ViewContainerRef
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableSetHeaderClassDemoComponent {
    tableData: TableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }


    columns: ColumnDefine[] = [
        {
            target: 'name',
            header: {
                clazz: 'red-text'
            }
        }];
}



